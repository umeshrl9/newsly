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


const API_KEY = process.env.API_KEY;

app.get("/home", async (req, res) => {
    const country = req.query.country || "us"; // Default to US
    const category = req.query.category || ""; // Empty means all categories


    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
            params: {
                apiKey: process.env.API_KEY, // Use .env API key
                country: country,
                category: category || undefined, // Exclude if empty
            },
        });


        const topArticles = response.data.articles.filter(
            (article) => article.urlToImage && article.description
        );


        res.render("home", { articles: topArticles.slice(0,15), year: new Date().getFullYear()});
    } catch (error) {
        console.error("Error fetching news:", error.message);
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