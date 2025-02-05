import {
    elizaLogger,
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
} from "@elizaos/core";
import { validateEigenConfig } from "../environment";
import { getOperatorExamples } from "../examples";
import { createEigenLayerService } from "../services";

export const getOperatorAction: Action = {
    name: "EIGEN_GET_OPERATOR",
    similes: [
        "OPERATOR",
        "VALIDATOR",
        "STAKING",
        "TVL"
    ],
    description: "Get EigenLayer operator statistics and TVL data.",
    validate: async (runtime: IAgentRuntime) => {
        await validateEigenConfig(runtime);
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        const config = await validateEigenConfig(runtime);
        const eigenService = createEigenLayerService(
            config.DUNE_API_KEY,
            config.DUNE_API_BASE_URL
        );

        try {
            // Extract operator address from message or state
            const operatorAddress = (message.content.operatorAddress as string) || "0x1b03d708aee5bdc46dbb09537ce455e1f75adc4d";

            const operatorData = await eigenService.getOperatorData(operatorAddress);
            elizaLogger.success(
                `Successfully fetched operator data for ${operatorAddress}`
            );

            if (callback) {
                callback({
                    text: `Here are the operator statistics:
                    
                    Operator Name: ${operatorData.operator_name}
                    Total TVL: ${operatorData.total_TVL} ETH
                    Number of Stakers: ${operatorData.num_stakers}
                    ETH TVL: ${operatorData.beacon_chain_ETH_TVL}
                    stETH TVL: ${operatorData.stETH_TVL}
                    `,
                    content: operatorData
                });
                return true;
            }
        } catch (error: any) {
            elizaLogger.error("Error in EigenLayer plugin handler:", error);
            callback({
                text: `Error fetching operator data: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: getOperatorExamples as ActionExample[][],
} as Action;
