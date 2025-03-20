const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const musicFolder = path.join(__dirname, 'music');  


app.use(express.static('public'));  
app.use('/music', express.static('music'));

app.get('/music', (req, res) => {
    console.log(req)
    fs.readdir(musicFolder, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan folder');
        }
        const songs =  files.filter(file => file.endsWith('.mp3'));
        res.json(songs);  
    });
});

app.listen(3000, () => {
    console.log('Server running', 3000);
});
