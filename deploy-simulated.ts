import { randomBytes } from "crypto";
import { setNetworkId } from "@midnight-ntwrk/midnight-js-network-id";
import { GhostSimulator } from "./src/test/ghost-simulator.js";

const INITIAL_SPENDING_LIMIT = 500n;
const NETWORK = "undeployed";

async function runSimulation() {
  console.log("Starting Ghost local simulation...");
  setNetworkId(NETWORK);

  console.log(
    `Deploying Ghost contract with spending limit: ${INITIAL_SPENDING_LIMIT}...`
  );

  const simulator = new GhostSimulator(INITIAL_SPENDING_LIMIT);
  const mockAddress = randomBytes(32).toString("hex");

  console.log("\n=============================================");
  console.log("Ghost Contract Deployment Complete");
  console.log("=============================================");
  console.log(`Contract Address: ${mockAddress}`);
  console.log(`Network: ${NETWORK}`);
  console.log(`Spending Limit: ${INITIAL_SPENDING_LIMIT}`);

  console.log("\nInitial Ledger State:");
  console.log(simulator.getLedger());
}

runSimulation().catch((error) => {
  console.error("Simulation failed:", error);
  process.exitCode = 1;
});
