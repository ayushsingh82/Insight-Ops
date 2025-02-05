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
import { getAvsExamples } from "../examples";
import { createEigenLayerService } from "../services";

export const getAvsAction: Action = {
    name: "EIGEN_GET_AVS",
    similes: [
        "AVS",
        "PROTOCOL",
        "STATISTICS",
        "TVL"
    ],
    description: "Get EigenLayer AVS statistics and TVL data.",
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
            const avsAddress = (message.content.avsAddress as string) || "0x23221c5bb90c7c57ecc1e75513e2e4257673f0ef";

            const avsData = await eigenService.getAVSData(avsAddress);
            elizaLogger.success(
                `Successfully fetched AVS data for ${avsAddress}`
            );

            if (callback) {
                callback({
                    text: `Here are the AVS statistics:
                    
                    AVS Name: ${avsData.avs_name}
                    Total TVL: ${avsData.total_TVL} ETH
                    Number of Operators: ${avsData.num_operators}
                    Number of Stakers: ${avsData.num_stakers}
                    EIGEN TVL: ${avsData.EIGEN_TVL}
                    Beacon Chain ETH TVL: ${avsData.beacon_chain_ETH_TVL}
                    `,
                    content: avsData
                });
                return true;
            }
        } catch (error: any) {
            elizaLogger.error("Error in EigenLayer plugin handler:", error);
            callback({
                text: `Error fetching AVS data: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: getAvsExamples as ActionExample[][],
} as Action;
