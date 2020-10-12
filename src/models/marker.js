const mongoose = require('mongoose');

const marker = new mongoose.Schema({
  url: { type: String, trim: true, required: [true, 'url is required'] },
  title: { type: String, trim: true },
  type: { type: String, trim: true },
  author: { type: String, trim: true },
  date: { type: String, trim: true },
  length: { type: String, trim: true },
  height: { type: String, trim: true },
  width: { type: String, trim: true },
  keyword: { type: String, trim: true }
});

module.exports = mongoose.model('Marker', marker);