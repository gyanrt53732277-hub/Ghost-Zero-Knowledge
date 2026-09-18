import { describe, expect, it } from "vitest";
import { setNetworkId } from "@midnight-ntwrk/midnight-js-network-id";
import { GhostSimulator } from "./ghost-simulator";

setNetworkId("undeployed");

describe("Ghost spending verification", () => {
  it("updates the ledger after a valid transaction", () => {
    const simulator = new GhostSimulator(100n);

    simulator.spend(40n);

    expect(simulator.getLedger().total_spent).toBe(40n);
  });
});
