import { describe, expect, it } from "vitest";
import { setNetworkId } from "@midnight-ntwrk/midnight-js-network-id";
import { GhostSimulator } from "./ghost-simulator";

setNetworkId("undeployed");

describe("Ghost spending limit", () => {
  it("rejects a transaction when the cumulative amount exceeds the limit", () => {
    const limit = 100n;
    const simulator = new GhostSimulator(limit);

    simulator.spend(60n);

    expect(() => {
      simulator.spend(50n);
    }).toThrow("failed assert: Spending limit exceeded");
  });
});
