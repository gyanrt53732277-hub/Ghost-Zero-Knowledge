import { useState } from "react";
import { getMidnightProvider } from "../midnight-provider";

export default function Navbar() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleWalletConnect = async () => {
    try {
      const provider = getMidnightProvider();

      if (!provider) {
        throw new Error(
          "Midnight wallet provider not found. Open Lace with the Midnight testnet profile and try again.",
        );
      }

      const walletApi =
        typeof provider.enable === "function"
          ? await provider.enable()
          : provider;

      setIsWalletConnected(true);

      window.dispatchEvent(
        new CustomEvent("midnight:connected", {
          detail: {
            api: walletApi,
            provider,
          },
        }),
      );
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : String(error);

      console.error("Unable to connect Midnight wallet:", error);
      window.alert(message);
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        inset: "0 0 auto 0",
        height: "3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: "3rem",
        backgroundColor: "#111827",
        zIndex: 50,
      }}
    >
      <button
        type="button"
        onClick={handleWalletConnect}
        style={{
          padding: "0.45rem 0.9rem",
          borderRadius: "0.55rem",
          border: "none",
          backgroundColor: "#4f46e5",
          color: "#ffffff",
          fontWeight: 700,
          fontSize: "0.9rem",
          cursor: "pointer",
        }}
      >
        {isWalletConnected
          ? "✅ Connected"
          : "Connect Midnight Lace Wallet"}
      </button>
    </nav>
  );
}
