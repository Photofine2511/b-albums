const express = require('express');
const router = express.Router();
const { 
  getAlbums, 
  getAlbum, 
  createAlbum, 
  verifyAlbumPassword,
  deleteAlbum 
} = require('../controllers/albumController');

router
  .route('/')
  .get(getAlbums)
  .post(createAlbum);

router
  .route('/:id')
  .get(getAlbum)
  .delete(deleteAlbum);

router.post('/:id/verify', verifyAlbumPassword);

module.exports = router; 