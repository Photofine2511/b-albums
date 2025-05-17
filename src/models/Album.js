const mongoose = require('mongoose');

// Schema for images within an album
const ImageSchema = new mongoose.Schema({
  secure_url: { 
    type: String, 
    required: true 
  },
  public_id: { 
    type: String, 
    required: true 
  },
  format: { 
    type: String, 
    required: true 
  },
  width: { 
    type: Number, 
    required: true 
  },
  height: { 
    type: Number, 
    required: true 
  },
  isCover: { 
    type: Boolean, 
    default: false 
  }
});

// Album schema
const AlbumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Album name is required'],
    trim: true,
    maxlength: [100, 'Album name cannot exceed 100 characters']
  },
  photographer: {
    type: String,
    required: [true, 'Photographer name is required'],
    trim: true,
    maxlength: [100, 'Photographer name cannot exceed 100 characters']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [4, 'Password must be at least 4 characters long']
  },
  coverPhoto: {
    type: ImageSchema,
    required: [true, 'Cover photo is required']
  },
  images: [ImageSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add a virtual property for unique public facing ID (can be used for sharing)
AlbumSchema.virtual('publicId').get(function() {
  return this._id.toString();
});

// Ensure virtual fields are included when converting to JSON
AlbumSchema.set('toJSON', { virtuals: true });
AlbumSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Album', AlbumSchema); 