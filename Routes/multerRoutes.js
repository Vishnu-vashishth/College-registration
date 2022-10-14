const express = require('express');
const multerRouter = express.Router();

const upload = require('../Multer/multer');

//multer route
multerRouter.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully')
})  

module.exports = multerRouter;


