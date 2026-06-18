import express from 'express';
const router = express.Router();

// Create order
router.post('/', (req, res) => {
  const order = {
    _id: Date.now().toString(),
    orderNumber: `ORD-${Date.now()}`,
    tableNumber: req.body.tableId || '1',
    items: req.body.items || [],
    subtotal: req.body.subtotal || 0,
    gst: req.body.gst || 0,
    total: req.body.total || 0,
    status: 'received',
    estimatedTime: 15,
    createdAt: new Date()
  };
  res.status(201).json({ order });
});

// Get order by ID
router.get('/:orderId', (req, res) => {
  res.json({
    _id: req.params.orderId,
    orderNumber: `ORD-${req.params.orderId}`,
    tableNumber: '1',
    items: [
      { name: 'Pizza', quantity: 2, price: 299, total: 598 },
      { name: 'Burger', quantity: 1, price: 199, total: 199 }
    ],
    subtotal: 797,
    gst: 39.85,
    total: 836.85,
    status: 'received',
    estimatedTime: 15,
    createdAt: new Date()
  });
});

// Accept order
router.put('/:orderId/accept', (req, res) => {
  res.json({ message: 'Order accepted', estimatedTime: req.body.estimatedTime || 15 });
});

// Update status
router.put('/:orderId/status', (req, res) => {
  res.json({ message: 'Status updated', status: req.body.status });
});

// Kitchen orders
router.get('/kitchen', (req, res) => {
  res.json([
    {
      _id: '1',
      orderNumber: 'ORD-001',
      tableNumber: '5',
      items: [
        { name: 'Pizza', quantity: 2, price: 299, total: 598 },
        { name: 'Burger', quantity: 1, price: 199, total: 199 }
      ],
      status: 'pending',
      estimatedTime: null,
      createdAt: new Date()
    },
    {
      _id: '2',
      orderNumber: 'ORD-002',
      tableNumber: '3',
      items: [
        { name: 'Pasta', quantity: 1, price: 249, total: 249 }
      ],
      status: 'received',
      estimatedTime: null,
      createdAt: new Date()
    }
  ]);
});

// Recent orders
router.get('/recent', (req, res) => {
  res.json([
    {
      _id: '1',
      orderNumber: 'ORD-001',
      tableNumber: '5',
      items: [{ name: 'Pizza' }, { name: 'Burger' }],
      total: 836.85,
      status: 'delivered',
      createdAt: new Date()
    }
  ]);
});

export default router;