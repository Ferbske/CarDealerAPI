const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require("./dbCon");

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use("/car", require("./routes/car"));
app.use("/employee", require("./routes/employee"));
app.use("/customer", require("./routes/customer"));

app.get("*", (request, result) => {
    result.status(404);
    result.json("Unknown route");
});

app.listen(port, () => {
    console.log('Running on port ' + port);
});

module.exports = app;
