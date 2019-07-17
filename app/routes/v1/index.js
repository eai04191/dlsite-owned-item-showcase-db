const express = require("express");
const router = express.Router();
const ItemModel = require("../../models/item.js");

router.post("/items", function(req, res) {
    const Item = new ItemModel();

    if (
        req.get("Referrer") === undefined ||
        (!req.get("Referrer").startsWith("https://dois.netlify.com") &&
            !req.get("Referrer").startsWith("https://localhost") &&
            !req.get("Referrer").startsWith("http://localhost"))
    ) {
        res.status(500).send();
        return;
    }

    if (!req.body.name || !req.body.data) {
        res.status(500).json({
            message: "missing parameters"
        });
        return;
    }

    Item.meta.name = req.body.name;

    try {
        Item.data = JSON.parse(req.body.data);
    } catch (e) {
        res.status(500).json({
            message: "invalid data"
        });
        return;
    }

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
