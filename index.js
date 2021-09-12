const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const dat = require("date-and-time");

var filesList = [];
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  var now = Date();
  var file_name = dat.format(new Date(), "DD-MM-YYYY-hh_mm_ss_A.txt");

  fs.writeFile(file_name, now, (err) => {
    if (err) console.log(err);
  });

  res.send(
    `<h3>A new file named <span style="color:crimson">${file_name}</span>, has been created</h3>
    <h5 style="color:teal">Please visit /allFiles route from current URL to get a list of all the files </h5>`
  );

  fs.readdir("./", (err, files) => {
    filesList = [];
    if (err) console.log(err);
    else
      files.map((item) => {
        if (path.extname(item) == ".txt") filesList.push(item);
      });
  });
});

app.get("/allFiles", (req, res) => {
  res.status(200);
  res.send(
    `${filesList
      .map((file) => {
        return `<li>${file}</li>`;
      })
      .join(" ")}`
  );
});

app.listen(port);
