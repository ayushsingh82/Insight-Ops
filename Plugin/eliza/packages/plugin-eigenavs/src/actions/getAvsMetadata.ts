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
import { getAvsMetadataExamples } from "../examples";
import { createEigenLayerService } from "../services";

export const getAvsMetadataAction: Action = {
    name: "EIGEN_GET_AVS_METADATA",
    similes: [
        "AVS",
        "PROTOCOL",
        "PROJECT",
        "INFORMATION"
    ],
    description: "Get EigenLayer AVS metadata and project information.",
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
            // Extract AVS address from message or state
            const avsAddress = (message.content.avsAddress as string) || "0x23221c5bb90c7c57ecc1e75513e2e4257673f0ef"; // Default example

            const avsMetadata = await eigenService.getAVSMetadata(avsAddress);
            elizaLogger.success(
                `Successfully fetched AVS metadata for ${avsAddress}`
            );

            if (callback) {
                callback({
                    text: `Here is information about the AVS:
                    
                    Name: ${avsMetadata.name}
                    Description: ${avsMetadata.description}
                    Website: ${avsMetadata.website}
                    Twitter: ${avsMetadata.twitter}
                    `,
                    content: avsMetadata
                });
                return true;
            }
        } catch (error: any) {
            elizaLogger.error("Error in EigenLayer plugin handler:", error);
            callback({
                text: `Error fetching AVS metadata: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: getAvsMetadataExamples as ActionExample[][],
} as Action;
