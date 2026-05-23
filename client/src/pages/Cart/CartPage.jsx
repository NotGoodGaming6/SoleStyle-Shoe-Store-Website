import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '@redux/cartSlice';
import toast from 'react-hot-toast';
import EmptyCart from '@pages/Cart/components/EmptyCart';
import CartItem from '@pages/Cart/components/CartItem';
import CartSummary from '@pages/Cart/components/CartSummary';
import { useAdminSettings } from '../../hooks/useAdminSettings';

const CartPage = () => {
  const { items, totalAmount } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { storeSettings } = useAdminSettings();

  const handleUpdateQuantity = (id, size, delta) => {
    dispatch(updateQuantity({ id, size, delta }));
  };

  const handleRemove = (id, size) => {
    dispatch(removeFromCart({ id, size }));
  };

  const handleCheckout = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to place an order.');
      navigate('/auth');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">Shopping Cart</h1>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              {items.length === 0 ? "Your bag is currently empty." : `You have ${items.length} items in your bag.`}
            </p>
          </div>

          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-8 space-y-6">
                {items.map((item) => (
                  <CartItem 
                    key={`${item.id}-${item.size}`} 
                    item={item} 
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemove}
                  />
                ))}
              </div>

              <div className="lg:col-span-4">
                <CartSummary 
                  totalAmount={totalAmount} 
                  onCheckout={handleCheckout} 
                  freeShippingThreshold={storeSettings.freeShippingThreshold}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CartPage;

