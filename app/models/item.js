const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ItemSchema = new Schema({
    meta: {
        name: String,
        date: { type: Date, default: Date.now }
    },
    data: Object
});

module.exports = mongoose.model("Item", ItemSchema);
