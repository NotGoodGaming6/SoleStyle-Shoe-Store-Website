const adminOrderService = require('#services/admin/admin.order.service');

const getAllOrders = async (req, res) => {
  try {
    const orders = await adminOrderService.getAllOrdersService();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await adminOrderService.updateOrderStatusService(req.params.id, status);
    res.json(updatedOrder);
  } catch (error) {
    const status = error.message === 'Order not found' ? 404 : 400;
    res.status(status).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const result = await adminOrderService.deleteOrderService(req.params.id);
    res.json(result);
  } catch (error) {
    const status = error.message === 'Order not found' ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

module.exports = {
  getAllOrders,
  updateOrderStatus,
  deleteOrder
};
