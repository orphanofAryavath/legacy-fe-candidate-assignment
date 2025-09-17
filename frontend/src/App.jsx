import { useState } from "react";
import Wallet from "./components/Wallet";
import SignMessage from "./components/SignalMessage";
import { Container, Typography, Box, Grid, Paper } from "@mui/material";
import { useDynamicContext } from "@dynamic-labs/sdk-react";

function App() {
  const [backendMsg] = useState("Backend will verify after signing");
  const { primaryWallet } = useDynamicContext();
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          bgcolor: "#121212",
          color: "white",
          borderRadius: 3,
          textAlign: "center",
          mb: 4,
        }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Frontend is running ✅
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {backendMsg}
        </Typography>
      </Paper>

      <Grid container spacing={3} direction="column">
        <Grid item xs={12}>
          <Wallet />
        </Grid>
        {primaryWallet && (
          <Grid item xs={12}>
            <SignMessage />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default App;
