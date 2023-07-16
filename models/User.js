const { model, Schema } = require('mongoose');

module.exports = model('User', new Schema({
    id: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    class : { type: String, required: true },
    mail : { type: String, required: true },
    username : { type: String, required: true },
    last_date : { type: String, default : "" },
    presences : { type: Number, default: 0 },
}));