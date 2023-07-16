const { model, Schema } = require('mongoose');

module.exports = model('Admin', new Schema({
    open : { type: Boolean, default: false },
}));

