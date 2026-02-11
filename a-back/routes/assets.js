const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Ensure uploads directory exists
const UPLOADS_ROOT = path.join(__dirname, '../uploads');
if (!fs.existsSync(UPLOADS_ROOT)) {
    fs.mkdirSync(UPLOADS_ROOT);
}

// Configure storage with custom filename logic
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const { folder = 'general' } = req.query;
        const targetDir = path.join(UPLOADS_ROOT, folder);

        // Create folder if not exists
        fs.mkdir(targetDir, { recursive: true }, (err) => cb(err, targetDir));
    },
    filename: function (req, file, cb) {
        const { prefix = 'file' } = req.query;
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        const safePrefix = prefix.toString().replace(/\s+/g, '-').toLowerCase();
        const fileName = `${safePrefix}-${timestamp}${ext}`;
        cb(null, fileName);
    }
});

const upload = multer({ storage });

// POST /api/assets?folder=products&prefix=watch
router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No filrnec e uploaded.' });
    }

    res.json({
        success: true,
        fileName: req.file.filename,
        originalName: req.file.originalname,
        folder: req.query.folder || 'general',
        filePath: `/uploads/${req.query.folder || 'general'}/${req.file.filename}`
    });
});



// Serve images from subfolders like /uploads/products/:filename
router.get('/uploads/:folder/:filename', function (req, res) {
    const { folder, filename } = req.params;


    const filePath = path.join(__dirname, '../uploads', folder, filename);

    res.sendFile(filePath, function (err) {
        if (err) {
            console.error('Error sending file:', err);
            res.status(err.status || 500).send('Image not found');
        }
    });
});


// DELETE: Remove image file from /uploads/:folder/:filename
router.delete('/uploads/:folder/:filename', function (req, res) {
    const { folder, filename } = req.params;
    const filePath = path.join(__dirname, '../uploads', folder, filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return res.status(404).json({ success: false, message: 'File not found or already deleted.' });
        }
        res.status(200).json({ success: true, message: 'File deleted successfully.' });
    });
});





module.exports = router;
