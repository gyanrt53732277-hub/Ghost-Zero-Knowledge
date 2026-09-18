import { describe, expect, it } from "vitest";
import { setNetworkId } from "@midnight-ntwrk/midnight-js-network-id";
import { GhostSimulator } from "./ghost-simulator";

setNetworkId("undeployed");

describe("Ghost contract initialization", () => {
  it("creates the simulator with the expected initial ledger state", () => {
    const spendingLimit = 100n;
    const ghost = new GhostSimulator(spendingLimit);

    const ledger = ghost.getLedger();

    expect(ledger).toMatchObject({
      spending_limit: spendingLimit,
      total_spent: 0n,
    });
  });
});
