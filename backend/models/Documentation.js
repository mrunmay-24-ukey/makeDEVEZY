const mongoose = require('mongoose');

const documentationSchema = new mongoose.Schema({
  repositoryUrl: {
    type: String,
    required: true
  },
  generatedDocs: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Documentation', documentationSchema);