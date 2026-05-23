import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus, Search, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ProductModal from '@pages/Admin/components/Products/ProductModal';
import ProductRow from '@pages/Admin/components/Products/ProductRow';
import ConfirmModal from '@components/shared/ConfirmModal';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [settings, setSettings] = useState(null);

  const [confirmConfig, setConfirmConfig] = useState({ 
    isOpen: false, 
    productId: null, 
    title: '', 
    message: '' 
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const [productsRes, settingsRes] = await Promise.all([
        fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/products'),
        fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/settings')
      ]);
      
      const productsData = await productsRes.json();
      if (Array.isArray(productsData)) {
        setProducts(productsData);
      } else {
        setProducts([]);
      }

      if (settingsRes.ok) {
        const settingsData = await settingsRes.json();
        setSettings(settingsData.storeSettings);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setProducts([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (productId) => {
    setConfirmConfig({
      isOpen: true,
      productId: productId,
      title: 'Delete Product?',
      message: 'Are you sure you want to remove this item? This action cannot be undone.'
    });
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/solestyle/admin/products/${confirmConfig.productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== confirmConfig.productId));
        setConfirmConfig({ ...confirmConfig, isOpen: false });
        toast.success('Product deleted successfully');
      }
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleSaveProduct = async (formData) => {
    const url = editingProduct 
      ? `${import.meta.env.VITE_API_BASE_URL}/api/solestyle/admin/products/${editingProduct.id}`
      : `${import.meta.env.VITE_API_BASE_URL}/api/solestyle/admin/products`;
    
    const method = editingProduct ? 'PUT' : 'POST';

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchProducts();
        toast.success(editingProduct ? 'Product updated' : 'Product created');
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
            Inventory
          </h1>
          <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
            Maintain your stock levels and product details.
          </p>
        </div>
        <button 
          onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
          className="flex items-center justify-center gap-2 rounded-2xl bg-primary-600 px-6 py-4 font-bold text-white shadow-xl shadow-primary-600/25 transition-all hover:bg-primary-700 hover:shadow-primary-600/40"
        >
          <Plus size={20} />
          Add New Shoe
        </button>
      </div>

      <div className="rounded-[2.5rem] border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
        <div className="border-b border-gray-100 p-6 dark:border-gray-800">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm focus:border-primary-500 focus:bg-white/10 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-700"
            />
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 text-xs font-bold uppercase tracking-wider text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
                  <th className="px-8 py-5">Product</th>
                  <th className="px-8 py-5">Category</th>
                  <th className="px-8 py-5">Price</th>
                  <th className="px-8 py-5">Stock</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <ProductRow 
                      key={product.id}
                      product={product}
                      settings={settings}
                      onEdit={(p) => { setEditingProduct(p); setIsModalOpen(true); }}
                      onDelete={handleDelete}
                    />
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>
      </div>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={editingProduct}
        onSave={handleSaveProduct}
      />

      <ConfirmModal 
        isOpen={confirmConfig.isOpen}
        onClose={() => setConfirmConfig({ ...confirmConfig, isOpen: false })}
        onConfirm={confirmDelete}
        title={confirmConfig.title}
        message={confirmConfig.message}
        confirmText="Yes, Delete"
      />
    </div>
  );
};

export default AdminProducts;

