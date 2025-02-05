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
import { getOperatorMetadataExamples } from "../examples";
import { createEigenLayerService } from "../services";

export const getOperatorMetadataAction: Action = {
    name: "EIGEN_GET_OPERATOR_METADATA",
    similes: [
        "OPERATOR",
        "VALIDATOR",
        "INFORMATION",
        "DETAILS"
    ],
    description: "Get EigenLayer operator metadata and information.",
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
            const operatorAddress = (message.content.operatorAddress as string) || "0x1b03d708aee5bdc46dbb09537ce455e1f75adc4d";

            const operatorMetadata = await eigenService.getOperatorMetadata(operatorAddress);
            elizaLogger.success(
                `Successfully fetched operator metadata for ${operatorAddress}`
            );

            if (callback) {
                callback({
                    text: `Here is information about the operator:
                    
                    Name: ${operatorMetadata.name}
                    Description: ${operatorMetadata.description}
                    Website: ${operatorMetadata.website}
                    Twitter: ${operatorMetadata.twitter}
                    Logo: ${operatorMetadata.logo}
                    `,
                    content: operatorMetadata
                });
                return true;
            }
        } catch (error: any) {
            elizaLogger.error("Error in EigenLayer plugin handler:", error);
            callback({
                text: `Error fetching operator metadata: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: getOperatorMetadataExamples as ActionExample[][],
} as Action;
