const fs = require("fs");


async function readImage(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject("Error reading image");
            } else {
                const b64Data = Buffer.from(data).toString('base64');
                resolve(b64Data);
            }
        });
    });
}


module.exports = {readImage};