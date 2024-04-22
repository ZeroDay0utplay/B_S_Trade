const express = require('express');
const multer = require('multer');
const cors = require("cors");

const app = express();
const upload = multer({ dest: 'uploads/' }); // Set upload destination directory
app.use(cors());
// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    console.log(file);
    if (!file) {
        return res.status(400).send('No file uploaded');
    }
    // Process the uploaded file (e.g., save it to the filesystem or database)
    res.status(200).send('File uploaded successfully');
});

// Start the Express server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
