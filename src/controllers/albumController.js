const Album = require('../models/Album');

// @desc    Get all albums
// @route   GET /api/albums
// @access  Public
exports.getAlbums = async (req, res) => {
  try {
    // Return only essential info for the album list view
    const albums = await Album.find().select('name photographer coverPhoto createdAt');
    res.status(200).json({
      success: true,
      count: albums.length,
      data: albums
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get single album
// @route   GET /api/albums/:id
// @access  Public (but requires password)
exports.getAlbum = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);

    if (!album) {
      return res.status(404).json({
        success: false,
        error: 'Album not found'
      });
    }

    // Create a response with only essential info (not including password)
    const albumResponse = {
      _id: album._id,
      name: album.name,
      photographer: album.photographer,
      coverPhoto: album.coverPhoto,
      createdAt: album.createdAt
    };

    res.status(200).json({
      success: true,
      data: albumResponse
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get album with images (password protected)
// @route   POST /api/albums/:id/verify
// @access  Protected by password
exports.verifyAlbumPassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        error: 'Password is required'
      });
    }

    const album = await Album.findById(req.params.id);

    if (!album) {
      return res.status(404).json({
        success: false,
        error: 'Album not found'
      });
    }

    // Check if password matches
    if (album.password !== password) {
      return res.status(401).json({
        success: false,
        error: 'Incorrect password'
      });
    }

    // Return the full album with images if password matches
    res.status(200).json({
      success: true,
      data: album
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create new album
// @route   POST /api/albums
// @access  Public
exports.createAlbum = async (req, res) => {
  try {
    const album = await Album.create(req.body);

    res.status(201).json({
      success: true,
      data: album
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// @desc    Delete album
// @route   DELETE /api/albums/:id
// @access  Protected by password
exports.deleteAlbum = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        error: 'Password is required to delete the album'
      });
    }

    const album = await Album.findById(req.params.id);

    if (!album) {
      return res.status(404).json({
        success: false,
        error: 'Album not found'
      });
    }

    // Check if password matches
    if (album.password !== password) {
      return res.status(401).json({
        success: false,
        error: 'Incorrect password'
      });
    }

    await album.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}; 