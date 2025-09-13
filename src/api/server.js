import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 5000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const dataPath = path.join(__dirname, "./data/data.json");
let dashboardData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));




app.get("/api/dashboard", (req, res) => {
  res.json(dashboardData);
});


app.get("/api/stats", (req, res) => {
  res.json({
    profileViews: dashboardData.stats.profileViews,   // 112000
    followers: dashboardData.stats.followers,         // 183000
    following: dashboardData.stats.following,         // 80000
    savedPosts: dashboardData.stats.savedPosts        // 112
  });
});


app.get("/api/profile-visit", (req, res) => {
  res.json(dashboardData.profileVisit);
});


app.get("/api/visitors", (req, res) => {
  res.json(dashboardData.visitors);
});


app.get("/api/traffic/:country", (req, res) => {
  const country = req.params.country.toLowerCase();
  if (dashboardData.traffic[country]) {
    res.json(dashboardData.traffic[country]);
  } else {
    res.status(404).json({ error: "Country data not found" });
  }
});

app.listen(port, () => {
  console.log(`✅ Mock API running at http://localhost:${port}`);
});
