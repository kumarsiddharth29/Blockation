const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const fileController = require('../controllers/fileUploadController')
// Route to send file
router.get('/sendfile', auth, fileController.sendFile);
router.post('/sendfile', auth, fileController.sendFile);
router.get('/getAllFiles', fileController.getAllFiles);

module.exports = router;
