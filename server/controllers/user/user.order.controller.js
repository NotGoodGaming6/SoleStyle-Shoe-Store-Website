const Order = require('#models/misc/misc.order.model');
const Product = require('#models/misc/misc.product.model');
const Setting = require('#models/misc/misc.setting.model');

exports.createOrder = async (req, res) => {
  try {
    const { items, phone, city, zipCode, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    if (!phone || !city || !shippingAddress) {
      return res.status(400).json({ message: 'Please provide all required shipping details' });
    }

    let calculatedTotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = await Product.findOne({ id: item.id });
      if (!product) {
        return res.status(404).json({ message: `Product ${item.id} not found` });
      }

      const itemTotalPrice = product.price * item.quantity;
      validatedItems.push({
        id: item.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        totalPrice: itemTotalPrice,
        size: item.size,
        category: product.category,
        image: product.image
      });

      calculatedTotal += itemTotalPrice;
    }

    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({});
    }

    const taxRate = settings.storeSettings.taxRate || 0;
    const threshold = settings.storeSettings.freeShippingThreshold || 75;
    
    const isFreeShipping = calculatedTotal >= threshold;
    const shippingFee = isFreeShipping ? 0 : 10;
    const taxAmount = Math.round((calculatedTotal * taxRate / 100) * 100) / 100;
    const finalAmount = Math.round((calculatedTotal + shippingFee + taxAmount) * 100) / 100;

    const order = new Order({
      user: req.user._id,
      items: validatedItems,
      subtotal: calculatedTotal,
      shippingFee,
      taxRate,
      taxAmount,
      totalAmount: finalAmount,
      phone,
      city,
      zipCode,
      shippingAddress,
      paymentMethod
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
