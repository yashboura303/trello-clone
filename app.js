const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const path = require('path');
const { notFoundHandler, errorHandler } = require('./middleware');
const boardHandler = require('./api/boardHandler');
const listHandler = require('./api/listHandler');
const cardHandler = require('./api/cardHandler');

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

app.use(morgan('tiny'));
app.use(helmet());

app.use(express.json());
app.use('/api/boards/', boardHandler);
app.use('/api/lists/', listHandler);
app.use('/api/cards/', cardHandler);
app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build/index.html'));
    });
}
app.use(notFoundHandler);

module.exports = app;
