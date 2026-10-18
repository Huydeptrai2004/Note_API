const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const notesRouter = require('./routes/notes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối Database
mongoose.connect('mongodb+srv://Huybeo:dntu123@cluster0.kgya3gd.mongodb.net/')
  .then(() => console.log('Đã kết nối với MongoDB Atlas thành công!'))
  .catch((err) => console.log('Lỗi kết nối DB:', err));

// Routes
app.use('/api/notes', notesRouter);

// Khởi chạy server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});