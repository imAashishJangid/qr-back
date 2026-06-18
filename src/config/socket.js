// backend/src/config/socket.js
import { io } from '../server.js';

export const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Join a room for specific restaurant
    socket.on('join-restaurant', (restaurantId) => {
      socket.join(`restaurant-${restaurantId}`);
    });

    // Join a room for specific table
    socket.on('join-table', (tableId) => {
      socket.join(`table-${tableId}`);
    });

    // Join a room for specific order
    socket.on('join-order', (orderId) => {
      socket.join(`order-${orderId}`);
    });

    // Staff joins kitchen room
    socket.on('join-kitchen', (restaurantId) => {
      socket.join(`kitchen-${restaurantId}`);
    });

    // Admin joins admin room
    socket.on('join-admin', (restaurantId) => {
      socket.join(`admin-${restaurantId}`);
    });

    // Handle order status updates
    socket.on('update-order-status', (data) => {
      const { orderId, status, estimatedTime } = data;
      io.to(`order-${orderId}`).emit('order-status-updated', {
        orderId,
        status,
        estimatedTime,
      });
      io.to(`kitchen-${data.restaurantId}`).emit('order-updated', {
        orderId,
        status,
      });
      io.to(`admin-${data.restaurantId}`).emit('order-updated', {
        orderId,
        status,
      });
    });

    // Handle new order
    socket.on('new-order', (data) => {
      io.to(`kitchen-${data.restaurantId}`).emit('new-order-alert', data);
      io.to(`admin-${data.restaurantId}`).emit('new-order-alert', data);
    });

    // Handle order acceptance
    socket.on('accept-order', (data) => {
      io.to(`order-${data.orderId}`).emit('order-accepted', {
        orderId: data.orderId,
        estimatedTime: data.estimatedTime,
      });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};