/**
 * Infrastructure and resilience integration tests.
 * Covers network configuration, cache behavior, and health reporting.
 */

import { describe, expect, it } from "vitest";
import {
  PRODUCTION_NETWORKS,
  checkMidnightInfrastructureHealth,
  stateCache,
} from "../lib/midnight/resilience.js";

describe("Midnight infrastructure resilience", () => {
  describe("Network endpoints", () => {
    it("provides separate configurations for supported networks", () => {
      const { preview, preprod, mainnet } = PRODUCTION_NETWORKS;

      expect(preview.indexerUri).toMatch(/preview/);
      expect(preprod.indexerUri).toMatch(/preprod/);
      expect(mainnet.indexerUri).toBeTruthy();

      expect(preview.explorerUri).toBe(
        "https://preview.midnightexplorer.com",
      );
      expect(preprod.explorerUri).toBe(
        "https://preprod.midnightexplorer.com",
      );
      expect(mainnet.explorerUri).toBe(
        "https://midnightexplorer.com",
      );
    });
  });

  describe("State cache", () => {
    it("retrieves a value before its TTL expires", () => {
      const key = "cache_test";
      const value = { blockHeight: 185420 };

      stateCache.set(key, value, 1000);

      expect(stateCache.get<typeof value>(key)).toEqual(value);
    });

    it("discards values after their TTL", async () => {
      const key = "ttl_test";

      stateCache.set(key, { data: "expired" }, 10);

      await new Promise((resolve) => setTimeout(resolve, 20));

      expect(stateCache.get(key)).toBeNull();
    });
  });

  describe("Infrastructure health", () => {
    it("reports healthy preprod services with current metrics", async () => {
      const result = await checkMidnightInfrastructureHealth("preprod");

      expect(result).toMatchObject({
        network: "preprod",
        indexerHealthy: true,
        proverHealthy: true,
      });

      expect(result.proverLatencyMs).toBeLessThanOrEqual(50);
      expect(result.lastBlockHeight).toBeGreaterThan(180000);
    });
  });
});
