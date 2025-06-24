import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {year: new Date().getFullYear()});
});

app.set("view engine", "ejs");

const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

app.get("/home", async (req, res) => {
  const country = req.query.country || "us";
  try {
    const response = await axios.get("https://gnews.io/api/v4/top-headlines", {
      params: {
        token: GNEWS_API_KEY,
        lang: "en",
        country: country,
        max: 15
      }
    });

    const articles = response.data.articles.filter(a => a.image && a.description);
    res.render("home", { articles, year: new Date().getFullYear() });
  } catch (err) {
    console.error("GNews Error:", err.message);
    res.render("home", { articles: [], year: new Date().getFullYear() });
  }
});



app.get("/about-us", (req, res) => {
    res.render("about.ejs", {year: new Date().getFullYear()});
});

//to give 404 for invalid get requests
app.use((req, res) => {
    res.status(404).render('notfound.ejs', {year: new Date().getFullYear()});
  });

app.listen(port, () => {
    console.log("Server running on port: " + port);
});