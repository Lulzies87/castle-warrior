"use strict";
var _a;
exports.__esModule = true;
require("dotenv/config");
var express_1 = require("express");
// import cors from "cors";
var body_parser_1 = require("body-parser");
var app = express_1["default"]();
// app.use(cors());
app.use(body_parser_1.json());
app.get("/check", function (req, res) {
    res.status(200);
    res.send("Hello");
});
var PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.listen(PORT, function () { return console.log("Listening on port " + PORT); });
