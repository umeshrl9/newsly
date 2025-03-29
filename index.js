import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {year: new Date().getFullYear()});
});

//to give 404 for invalid get requests
app.use((req, res) => {
    res.status(404).render('notfound.ejs', {year: new Date().getFullYear()});
  });

app.listen(port, () => {
    console.log("Server running on port: " + port);
});