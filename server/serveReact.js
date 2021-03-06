const path = require('path');
const express = require('express');
const serveGzippedFiles = require('./middleware/serveStaticallyCompressedInstead');
const clientPath = path.join(__dirname, '../client', 'build');

module.exports = (app) => {
    app.use(serveGzippedFiles);
    app.use(express.static(clientPath));
    app.get('/*', function (req, res) {
        res.sendFile(path.join(clientPath, 'index.html'));
    });
}
