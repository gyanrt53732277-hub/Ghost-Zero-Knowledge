import {
  CostModel,
  QueryContext,
  createConstructorContext,
  sampleContractAddress,
  type CircuitContext,
} from "@midnight-ntwrk/compact-runtime";
import {
  Contract,
  ledger,
  type Ledger,
} from "../managed/ghost/contract/index";

export class GhostSimulator {
  readonly contract: Contract<void>;
  private circuitContext: CircuitContext<void>;

  constructor(spendingLimit: bigint) {
    this.contract = new Contract<void>({});

    const initialContext = createConstructorContext(
      {},
      "0".repeat(64),
    );

    const {
      currentPrivateState,
      currentContractState,
      currentZswapLocalState,
    } = this.contract.initialState(
      initialContext,
      spendingLimit,
    );

    this.circuitContext = {
      currentPrivateState,
      currentZswapLocalState,
      costModel: CostModel.initialCostModel(),
      currentQueryContext: new QueryContext(
        currentContractState.data,
        sampleContractAddress(),
      ),
    };
  }

  public getLedger(): Ledger {
    const state = this.circuitContext.currentQueryContext.state;
    return ledger(state);
  }

  public spend(amount: bigint): Ledger {
    const result = this.contract.impureCircuits.spend(
      this.circuitContext,
      amount,
    );

    this.circuitContext = result.context;

    return this.getLedger();
  }
}
