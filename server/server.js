const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");
const path = require("path");


const app = express();
app.use(cors());
app.use(express.json());

const DATA_PATH = path.resolve("bookmarks.json");

// Read JSON
async function loadData() {
  const exists = await fs.pathExists(DATA_PATH);
  if (!exists) return [];
  return fs.readJSON(DATA_PATH);
}

// Save JSON
async function saveData(data) {
  await fs.writeJSON(DATA_PATH, data, { spaces: 2 });
}

// Get all bookmarks
app.get("/bookmarks", async (req, res) => {
  const data = await loadData();
  res.json(data);
});

// Add bookmark
app.post("/bookmarks", async (req, res) => {
  const data = await loadData();
  const newBookmark = { id: Date.now(), ...req.body };
  data.unshift(newBookmark);
  await saveData(data);
  res.json(newBookmark);
});

// Update bookmark
app.put("/bookmarks/:id", async (req, res) => {
  const data = await loadData();
  const id = Number(req.params.id);
  const idx = data.findIndex((b) => b.id === id);

  if (idx === -1) return res.status(404).json({ error: "Not found" });

  data[idx] = { ...data[idx], ...req.body };
  await saveData(data);

  res.json(data[idx]);
});

// Delete bookmark
app.delete("/bookmarks/:id", async (req, res) => {
  const data = await loadData();
  const id = Number(req.params.id);

  const filtered = data.filter((b) => b.id !== id);
  await saveData(filtered);

  res.json({ success: true });
});

app.listen(4000, () => console.log("API running on http://localhost:4000"));
