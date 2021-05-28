const mongoose = require('mongoose');
const { Schema } = mongoose;

const boardSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('board', boardSchema);
