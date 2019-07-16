const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ItemSchema = new Schema({
    meta: {
        name: String,
        date: { type: Date, default: Date.now }
    },
    data: String
});

module.exports = mongoose.model("Item", ItemSchema);
