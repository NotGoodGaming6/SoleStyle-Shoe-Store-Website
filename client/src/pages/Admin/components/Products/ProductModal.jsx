import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload } from 'lucide-react';

const ProductModal = ({ isOpen, onClose, product, onSave }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    category: '',
    description: '',
    stock: 0,
    sizes: []
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id || '',
        name: product.name || '',
        price: product.price || '',
        category: product.category || '',
        description: product.description || '',
        stock: product.stock || 0,
        sizes: product.sizes || []
      });
      setImagePreview(product.image ? `${import.meta.env.VITE_API_BASE_URL}${product.image}` : null);
    } else {
      setFormData({ id: '', name: '', price: '', category: '', description: '', stock: 0, sizes: [] });
      setImagePreview(null);
    }
    setImageFile(null);
  }, [product, isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-gray-950/60 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl rounded-[2.5rem] border border-gray-800 bg-gray-900 p-8 shadow-2xl sm:p-10 my-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-white">
              {product ? 'Edit Product' : 'Add New Shoe'}
            </h2>
            <button onClick={onClose} className="rounded-full p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData();
            Object.keys(formData).forEach(key => {
              if (key === 'sizes') {
                data.append(key, JSON.stringify(formData[key]));
              } else {
                data.append(key, formData[key]);
              }
            });
            if (imageFile) data.append('image', imageFile);
            onSave(data);
          }} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Product Image</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="relative group h-48 cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed border-gray-800 bg-gray-950/50 transition-all hover:border-primary-500 hover:bg-gray-800/50 flex flex-col items-center justify-center text-gray-500"
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                  ) : (
                    <>
                      <Upload size={32} className="mb-2 group-hover:text-primary-500 transition-colors" />
                      <span className="text-xs font-bold uppercase">Upload Photo</span>
                    </>
                  )}
                  <div className="absolute inset-0 bg-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-bold bg-primary-600 px-4 py-2 rounded-full shadow-lg">Change Image</span>
                  </div>
                </div>
                <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Product ID (Auto-Generated)</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      readOnly
                      value={formData.id}
                      className="w-full rounded-2xl border border-gray-800 bg-gray-950/30 p-4 pr-12 text-gray-400 focus:outline-none transition-all cursor-not-allowed font-mono text-xs"
                      placeholder="Will be generated automatically..."
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-500/50">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Shoe Name</label>
                  <input 
                    type="text" required value={formData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      const updates = { name };
                      if (!product) {
                        // Auto-generate ID from name + random suffix for uniqueness
                        const slug = name.toLowerCase()
                          .replace(/[^a-z0-9]/g, '-')
                          .replace(/-+/g, '-')
                          .replace(/^-|-$/g, '');
                        if (slug) {
                          const randomSuffix = Math.random().toString(36).substring(2, 6);
                          updates.id = `${slug}-${randomSuffix}`;
                        }
                      }
                      setFormData({...formData, ...updates});
                    }}
                    className="w-full rounded-2xl border border-gray-800 bg-gray-950/50 p-4 text-white focus:border-primary-500 focus:bg-gray-900 focus:outline-none transition-all"
                    placeholder="e.g. Air Max 2024"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Price ($)</label>
                <input 
                  type="number" required value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full rounded-2xl border border-gray-800 bg-gray-950/50 p-4 text-white focus:border-primary-500 focus:bg-gray-900 focus:outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Stock</label>
                <input 
                  type="number" required value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  className="w-full rounded-2xl border border-gray-800 bg-gray-950/50 p-4 text-white focus:border-primary-500 focus:bg-gray-900 focus:outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Category</label>
                <select 
                  required value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full rounded-2xl border border-gray-800 bg-gray-950/50 p-4 text-white focus:border-primary-500 focus:bg-gray-900 focus:outline-none transition-all"
                >
                  <option value="">Select...</option>
                  {categories.map(cat => (
                    <option key={cat.id || cat._id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Description</label>
              <textarea 
                rows={4} value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full rounded-2xl border border-gray-800 bg-gray-950/50 p-4 text-white focus:border-primary-500 focus:bg-gray-900 focus:outline-none transition-all resize-none custom-scrollbar overflow-y-auto"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1 flex justify-between items-center">
                Available Sizes
                <button
                  type="button"
                  onClick={() => setFormData({...formData, sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14, 15]})}
                  className="text-[10px] text-primary-500 hover:text-primary-400 normal-case"
                >
                  Select All
                </button>
              </label>
              <div className="flex flex-wrap gap-2 p-4 rounded-2xl border border-gray-800 bg-gray-950/50">
                {[6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14, 15].map(size => {
                  const isSelected = formData.sizes?.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        const currentSizes = formData.sizes || [];
                        const newSizes = isSelected 
                          ? currentSizes.filter(s => s !== size)
                          : [...currentSizes, size].sort((a, b) => a - b);
                        setFormData({...formData, sizes: newSizes});
                      }}
                      className={`h-10 w-10 rounded-xl font-bold text-xs transition-all flex items-center justify-center ${
                        isSelected 
                          ? 'bg-primary-600 text-white shadow-md' 
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            <button type="submit" className="w-full rounded-2xl bg-primary-600 py-5 font-black text-white shadow-xl shadow-primary-600/25 transition-all hover:bg-primary-700 hover:shadow-primary-600/40 mt-4">
              {product ? 'Save Changes' : 'Create Product'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductModal;

