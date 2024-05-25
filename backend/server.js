const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes'); // Import authRoutes
const authMiddleware = require('./middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const certificateRoutes = require('./routes/certificateRoutes'); // Import certificateRoutes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();
// Set up storage engine for images
const imageStorage = multer.diskStorage({
    destination: './uploads/images',
    filename: function (req, file, cb) {
        cb(null, 'image-' + Date.now() + path.extname(file.originalname));
    }
});

// Set up storage engine for videos
const videoStorage = multer.diskStorage({
    destination: './uploads/videos',
    filename: function (req, file, cb) {
        cb(null, 'video-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize image upload
const imageUpload = multer({
    storage: imageStorage,
    limits: { fileSize: 1000000 }, // 1MB limit
    fileFilter: function (req, file, cb) {
        checkImageFileType(file, cb);
    }
}).single('image');

// Initialize video upload
const videoUpload = multer({
    storage: videoStorage,
    limits: { fileSize: 50000000 }, // 50MB limit
    fileFilter: function (req, file, cb) {
        checkVideoFileType(file, cb);
    }
}).single('video');

// Check image file type
function checkImageFileType(file, cb) {
    const imageFiletypes = /jpeg|jpg|png|gif|webp/;
    const extname = imageFiletypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = imageFiletypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Check video file type
function checkVideoFileType(file, cb) {
    const videoFiletypes = /mp4|avi|mov/;
    const extname = videoFiletypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = videoFiletypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Videos Only!');
    }
}

// Route for handling image uploads
app.post('/upload/image', (req, res) => {
    imageUpload(req, res, (err) => {
        if (err) {
            res.status(400).json({ error: err });
        } else {
            if (req.file == undefined) {
                res.status(400).json({ error: 'No file selected' });
            } else {
                res.json({ filePath: `/uploads/images/${req.file.filename}` });
            }
        }
    });
});

// Route for handling video uploads
app.post('/upload/video', (req, res) => {
    videoUpload(req, res, (err) => {
        if (err) {
            res.status(400).json({ error: err });
        } else {
            if (req.file == undefined) {
                res.status(400).json({ error: 'No file selected' });
            } else {
                res.json({ filePath: `/uploads/videos/${req.file.filename}` });
            }
        }
    });
});

app.use('/uploads', express.static('uploads'));


// Routes
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes); // Use authRoutes for authentication
app.use('/api/certificates', certificateRoutes); // Use certificateRoutes for certificates


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
