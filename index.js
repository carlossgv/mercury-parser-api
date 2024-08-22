const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const config = require('./config');
const routes = require('./routes');

const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(morgan('tiny'));

app.use(
    cors({
        origin: [
            'chrome-extension://kdokclkghphanfgodkdijmnlljknjeon', // Allow the Chrome extension
        ],
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

app.use('/', routes);

app.listen(config.server.port, () => {
    console.log(`🚀Mercury Parser API listens on port ${config.server.port}`);
});

module.exports = app;
