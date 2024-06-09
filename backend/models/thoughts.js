const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const thoughtsSchema = new Schema ({
    description: { type: String, required: true},
    name: { type: String, required: true},
    date: { type: String, required: true}
});

module.exports = mongoose.model('Thoughts', thoughtsSchema);