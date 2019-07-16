const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", function(err) {
    console.error("MongoDB connection error: " + err);
    process.exit(-1);
});

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "12mb", extended: true }));
app.use(bodyParser.json());

const router = require("./routes/v1/");
app.use("/v1/", router);

app.get("/", function(req, res) {
    res.redirect(
        301,
        "https://github.com/eai04191/dlsite-owned-item-showcase-db"
    );
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log("listen on port " + port);
