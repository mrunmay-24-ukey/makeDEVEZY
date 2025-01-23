const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    code: { type: String, required: true },
    tags: { type: [String], default: [] },
    
    
  },
  { timestamps: true }
);

module.exports = mongoose.model('Snippet', snippetSchema);
