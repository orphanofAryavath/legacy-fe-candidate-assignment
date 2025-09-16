const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend is running ✅" });
});

app.post("/verify-signature", (req, res) => {
  res.json({ success: true, message: "Signature verified (dummy response)" });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
