import express from 'express';
const router = express.Router();

router.get('/:tableId', (req, res) => {
  res.json({
    _id: req.params.tableId,
    tableNumber: req.params.tableId,
    capacity: 4,
    isOccupied: false
  });
});

export default router;