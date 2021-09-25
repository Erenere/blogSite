const express = require('express');
const blogContoller = require('../controllers/blogController');

const router = express.Router();

router.get('/create', blogContoller.blogCreate);

router.get('/:id', blogContoller.getBlog);

router.delete('/:id', blogContoller.deleteBlog);

router.get('/', blogContoller.getAllBlogs);

router.post('/', blogContoller.postBlog);

module.exports = router;