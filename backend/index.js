const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/verify-signature", (req, res) => {
  const { message, signature, address } = req.body;

  try {
    const recovered = ethers.verifyMessage(message, signature);

    if (recovered.toLowerCase() === address.toLowerCase()) {
      return res.json({ success: true, recovered });
    } else {
      return res.json({ success: false, recovered });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: err.message });
  }
});

app.listen(8080, () => {
  console.log("✅ Backend running on http://localhost:8080");
});
