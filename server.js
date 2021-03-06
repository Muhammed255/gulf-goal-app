const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + "/dist/gulf-goal-admin"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/gulf-goal-admin/index.html"));
});

app.listen(PORT, function() {
  console.log(`Runnging on PORT ${PORT}`);
});