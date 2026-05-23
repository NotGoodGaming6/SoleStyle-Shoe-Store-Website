const Order = require('#models/misc/misc.order.model');

exports.getAllOrdersService = async () => {
    return await Order.find()
        .populate('user', 'name email')
        .sort({ orderDate: -1 });
};

exports.updateOrderStatusService = async (orderId, status) => {
    const order = await Order.findByIdAndUpdate(
        orderId, 
        { status }, 
        { new: true }
    ).populate('user', 'name email');
    
    if (!order) throw new Error('Order not found');
    return order;
};

exports.deleteOrderService = async (orderId) => {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) throw new Error('Order not found');
    return { message: 'Order deleted successfully' };
};
