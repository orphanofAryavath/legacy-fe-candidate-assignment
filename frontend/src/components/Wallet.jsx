import { useDynamicContext } from "@dynamic-labs/sdk-react";
import { Box, Button, Typography, Paper } from "@mui/material";

export default function Wallet() {
  const { primaryWallet, setShowAuthFlow, handleLogOut } = useDynamicContext();

  return (
    <Paper
      elevation={4}
      sx={{ p: 3, maxWidth: 450, margin: "20px auto", bgcolor: "#1e1e1e" }}>
      {!primaryWallet ? (
        <Box textAlign="center">
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={() => setShowAuthFlow(true)}>
            Connect Wallet
          </Button>
        </Box>
      ) : (
        <Box textAlign="center">
          <Typography variant="body1" color="white" gutterBottom sx={{ mb: 2 }}>
            ✅ Connected: {primaryWallet.address}
          </Typography>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleLogOut}>
            Logout
          </Button>
        </Box>
      )}
    </Paper>
  );
}
