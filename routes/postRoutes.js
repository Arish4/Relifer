const express = require('express');
const { getpost, createpost, deletepost, updatepost} = require('../controllers/postController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/getpost', getpost);
router.post('/createpost',authMiddleware, createpost);
router.delete('/:id',authMiddleware, deletepost);
router.put('/:id',authMiddleware, updatepost);
 

module.exports = router;