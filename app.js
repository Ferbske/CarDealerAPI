const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require("./dbCon");

app.use("/car", require("./routes/car"));
app.use("/employee", require("./routes/employee"));
app.use("/customer", require("./routes/customer"));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get("*", (request, result) => {
    result.status(404);
    result.json("Unknown route");
});

app.listen(port, () => {
    console.log('Running on port ' + port);
});

module.exports = app;
