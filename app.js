const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require("./dbCon");

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
