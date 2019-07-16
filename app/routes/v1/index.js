const express = require("express");
const router = express.Router();
const ItemModel = require("../../models/item.js");

router.post("/items", function(req, res) {
    const Item = new ItemModel();

    if (!req.get("Referrer").startsWith("https://dois.netlify.com")) {
        res.status(500).send();
        return;
    }

    if (req.body.name || req.body.data) {
        res.status(500).json({
            message: "missing parameters"
        });
        return;
    }

    Item.meta.name = req.body.name;
    Item.data = req.body.data;

    Item.save(function(err, item) {
        if (err) {
            console.error(err);
            res.status(500).json({
                message: "something went wrong with saving"
            });
        } else {
            res.json({ id: item.id });
        }
    });
});

router.get("/items/:id", function(req, res) {
    const id = req.params.id;

    ItemModel.findById(id, function(err, user) {
        res.json(user);
    });
});

module.exports = router;
