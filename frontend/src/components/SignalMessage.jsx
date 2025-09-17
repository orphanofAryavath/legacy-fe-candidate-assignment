import { useDynamicContext } from "@dynamic-labs/sdk-react";
import { ethers } from "ethers";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";

export default function SignMessage() {
  const { primaryWallet } = useDynamicContext();
  const [msg, setMsg] = useState("");
  const [sig, setSig] = useState("");
  const [verified, setVerified] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("messageHistory");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  // Save history on update
  useEffect(() => {
    localStorage.setItem("messageHistory", JSON.stringify(history));
  }, [history]);

  const handleSign = async () => {
    setError("");
    setVerified("");
    setSig("");

    if (!primaryWallet) {
      setError("⚠️ Please connect your wallet first.");
      return;
    }
    if (!msg.trim()) {
      setError("⚠️ Please enter a message.");
      return;
    }

    try {
      setLoading(true);

      const provider = new ethers.providers.Web3Provider(window.ethereum); // ethers v5
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();

      const signature = await signer.signMessage(msg);
      setSig(signature);

      const res = await axios.post("http://localhost:8080/verify-signature", {
        message: msg,
        signature,
        address: signerAddress,
      });

      const status = res.data.success ? "✅ Verified" : "❌ Failed";
      setVerified(`${status} (by ${signerAddress})`);

      // Save to history
      const entry = {
        message: msg,
        signature,
        result: status,
        address: signerAddress,
        ts: new Date().toLocaleString(),
      };
      setHistory([entry, ...history]);
    } catch (err) {
      console.error(err);
      setError("❌ Error verifying signature.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{ p: 3, maxWidth: 450, margin: "20px auto", bgcolor: "#1e1e1e" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom color="white">
        Sign & Verify
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Enter a message"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        sx={{ mb: 2, bgcolor: "white", borderRadius: 1 }}
      />

      <Button
        fullWidth
        variant="contained"
        color="primary"
        disabled={loading}
        onClick={handleSign}
        sx={{ mb: 2 }}>
        {loading ? <CircularProgress size={24} /> : "Sign & Verify"}
      </Button>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {sig && (
        <Typography
          variant="body2"
          sx={{ wordBreak: "break-word", mb: 1, color: "white" }}>
          ✍️ Signature: {sig}
        </Typography>
      )}
      {verified && (
        <Alert severity={verified.includes("✅") ? "success" : "warning"}>
          {verified}
        </Alert>
      )}

      {history.length > 0 && (
        <Box mt={3}>
          <Typography variant="h6" color="white" gutterBottom>
            History
          </Typography>
          <List
            sx={{
              maxHeight: 200,
              overflowY: "auto",
              bgcolor: "#2e2e2e",
              borderRadius: 1,
            }}>
            {history.map((h, i) => (
              <ListItem key={i} sx={{ borderBottom: "1px solid #444" }}>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="body2" color="white">
                        <b>Msg:</b> {h.message}
                      </Typography>
                      <Typography variant="body2" color="white">
                        <b>Result:</b> {h.result}
                      </Typography>
                      <Typography variant="body2" color="white">
                        <b>Wallet:</b> {h.address}
                      </Typography>
                    </>
                  }
                  secondary={
                    <Typography variant="caption" color="gray">
                      {h.ts}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Paper>
  );
}
