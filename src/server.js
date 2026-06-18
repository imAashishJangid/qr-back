import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend is running without MongoDB!',
    timestamp: new Date().toISOString()
  });
});

// Menu route
app.get('/api/menu/:tableId', (req, res) => {
  res.json({ 
    items: [
      { 
        _id: '1', 
        name: 'Margherita Pizza', 
        price: 299, 
        description: 'Classic cheese pizza', 
        isVeg: true,
        categoryId: '1',
        isBestseller: true,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
      },
      { 
        _id: '2', 
        name: 'Pepperoni Pizza', 
        price: 349, 
        description: 'Spicy pepperoni', 
        isVeg: false,
        categoryId: '1',
        isBestseller: false,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e'
      },
      { 
        _id: '3', 
        name: 'Classic Burger', 
        price: 199, 
        description: 'Juicy beef burger with cheese', 
        isVeg: false,
        categoryId: '2',
        isBestseller: true,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'
      },
      { 
        _id: '4', 
        name: 'Veg Burger', 
        price: 159, 
        description: 'Healthy veggie patty', 
        isVeg: true,
        categoryId: '2',
        isBestseller: false,
        image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90'
      },
      { 
        _id: '5', 
        name: 'French Fries', 
        price: 99, 
        description: 'Crispy golden fries', 
        isVeg: true,
        categoryId: '3',
        isBestseller: false,
        image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d'
      },
      { 
        _id: '6', 
        name: 'Cheesy Fries', 
        price: 149, 
        description: 'Fries loaded with cheese', 
        isVeg: true,
        categoryId: '3',
        isBestseller: false,
        image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5'
      },
      { 
        _id: '7', 
        name: 'Pasta Carbonara', 
        price: 249, 
        description: 'Creamy pasta with bacon', 
        isVeg: false,
        categoryId: '4',
        isBestseller: false,
        image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601'
      },
      { 
        _id: '8', 
        name: 'Hot Coffee', 
        price: 79, 
        description: 'Fresh brewed coffee', 
        isVeg: true,
        categoryId: '5',
        isBestseller: false,
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd'
      },
      { 
        _id: '9', 
        name: 'Cold Coffee', 
        price: 99, 
        description: 'Chilled coffee with ice cream', 
        isVeg: true,
        categoryId: '5',
        isBestseller: false,
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735'
      },
      { 
        _id: '10', 
        name: 'Chocolate Shake', 
        price: 129, 
        description: 'Thick chocolate milkshake', 
        isVeg: true,
        categoryId: '6',
        isBestseller: false,
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699'
      }
    ]
  });
});

// Categories route
app.get('/api/menu/categories/:tableId', (req, res) => {
  res.json([
    { _id: '1', name: 'Pizza', icon: '🍕' },
    { _id: '2', name: 'Burger', icon: '🍔' },
    { _id: '3', name: 'Fries', icon: '🍟' },
    { _id: '4', name: 'Pasta', icon: '🍝' },
    { _id: '5', name: 'Coffee', icon: '☕' },
    { _id: '6', name: 'Shakes', icon: '🥤' }
  ]);
});

// Place order
app.post('/api/orders', (req, res) => {
  const order = {
    _id: `ord_${Date.now()}`,
    orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
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
app.get('/api/orders/:orderId', (req, res) => {
  res.json({
    _id: req.params.orderId,
    orderNumber: `ORD-${req.params.orderId.slice(-6)}`,
    tableNumber: '1',
    items: [
      { name: 'Margherita Pizza', quantity: 2, price: 299, total: 598 },
      { name: 'Classic Burger', quantity: 1, price: 199, total: 199 }
    ],
    subtotal: 797,
    gst: 39.85,
    total: 836.85,
    status: 'received',
    estimatedTime: 15,
    createdAt: new Date()
  });
});

// Kitchen orders
app.get('/api/orders/kitchen', (req, res) => {
  res.json([
    {
      _id: 'ord_1',
      orderNumber: 'ORD-001',
      tableNumber: '5',
      items: [
        { name: 'Margherita Pizza', quantity: 2, price: 299, total: 598 },
        { name: 'Classic Burger', quantity: 1, price: 199, total: 199 }
      ],
      status: 'pending',
      estimatedTime: null,
      createdAt: new Date()
    },
    {
      _id: 'ord_2',
      orderNumber: 'ORD-002',
      tableNumber: '3',
      items: [
        { name: 'Pasta Carbonara', quantity: 1, price: 249, total: 249 },
        { name: 'Cold Coffee', quantity: 2, price: 99, total: 198 }
      ],
      status: 'received',
      estimatedTime: null,
      createdAt: new Date()
    }
  ]);
});

// Recent orders
app.get('/api/orders/recent', (req, res) => {
  res.json([
    {
      _id: 'ord_3',
      orderNumber: 'ORD-003',
      tableNumber: '2',
      items: [{ name: 'Pizza' }, { name: 'Fries' }],
      total: 398,
      status: 'delivered',
      createdAt: new Date()
    },
    {
      _id: 'ord_2',
      orderNumber: 'ORD-002',
      tableNumber: '3',
      items: [{ name: 'Pasta' }, { name: 'Coffee' }],
      total: 447,
      status: 'preparing',
      createdAt: new Date()
    }
  ]);
});

// Accept order
app.put('/api/orders/:orderId/accept', (req, res) => {
  res.json({ 
    message: 'Order accepted', 
    estimatedTime: req.body.estimatedTime || 15 
  });
});

// Update status
app.put('/api/orders/:orderId/status', (req, res) => {
  res.json({ 
    message: 'Status updated', 
    status: req.body.status 
  });
});

// Admin dashboard
app.get('/api/admin/dashboard', (req, res) => {
  res.json({
    totalOrders: 156,
    revenue: 45680,
    totalCustomers: 89,
    conversionRate: 68,
    dailyRevenue: [
      { date: '2026-06-14', revenue: 3200 },
      { date: '2026-06-15', revenue: 4100 },
      { date: '2026-06-16', revenue: 2800 },
      { date: '2026-06-17', revenue: 3900 },
      { date: '2026-06-18', revenue: 4500 }
    ],
    orderStatus: [
      { name: 'Delivered', value: 65 },
      { name: 'Preparing', value: 20 },
      { name: 'Pending', value: 10 },
      { name: 'Cancelled', value: 5 }
    ],
    topItems: [
      { name: 'Margherita Pizza', sales: 45 },
      { name: 'Classic Burger', sales: 38 },
      { name: 'Pasta Carbonara', sales: 30 },
      { name: 'French Fries', sales: 28 }
    ]
  });
});

// Analytics
app.get('/api/analytics/dashboard', (req, res) => {
  res.json({
    totalOrders: 156,
    revenue: 45680,
    totalCustomers: 89,
    conversionRate: 68,
    dailyRevenue: [
      { date: '2026-06-14', revenue: 3200 },
      { date: '2026-06-15', revenue: 4100 },
      { date: '2026-06-16', revenue: 2800 },
      { date: '2026-06-17', revenue: 3900 },
      { date: '2026-06-18', revenue: 4500 }
    ]
  });
});

// Socket.IO
io.on('connection', (socket) => {
  console.log('🟢 New client connected:', socket.id);
  
  socket.on('join-restaurant', (restaurantId) => {
    socket.join(`restaurant-${restaurantId}`);
  });
  
  socket.on('join-table', (tableId) => {
    socket.join(`table-${tableId}`);
  });
  
  socket.on('join-order', (orderId) => {
    socket.join(`order-${orderId}`);
  });
  
  socket.on('join-kitchen', (restaurantId) => {
    socket.join(`kitchen-${restaurantId}`);
  });
  
  socket.on('new-order', (data) => {
    io.to(`kitchen-${data.restaurantId}`).emit('new-order-alert', data);
    io.to(`admin-${data.restaurantId}`).emit('new-order-alert', data);
  });
  
  socket.on('accept-order', (data) => {
    io.to(`order-${data.orderId}`).emit('order-accepted', data);
  });
  
  socket.on('update-order-status', (data) => {
    io.to(`order-${data.orderId}`).emit('order-status-updated', data);
    io.to(`kitchen-${data.restaurantId}`).emit('order-updated', data);
  });
  
  socket.on('disconnect', () => {
    console.log('🔴 Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📁 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Test API: http://localhost:${PORT}/api/test`);
  console.log(`ℹ️  MongoDB is SKIPPED - Using mock data`);
});