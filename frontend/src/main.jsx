import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DynamicContextProvider
      settings={{
        environmentId: envId, // 🔑 from Dynamic dashboard
        walletConnectors: [EthereumWalletConnectors],
      }}>
      <App />
    </DynamicContextProvider>
  </React.StrictMode>
);
