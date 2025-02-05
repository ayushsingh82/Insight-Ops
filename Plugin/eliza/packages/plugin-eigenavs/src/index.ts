import { Plugin } from "@elizaos/core";
import { getOperatorAction } from "./actions/getOperator";
import { getOperatorMetadataAction } from "./actions/getOperatorMetadata";
import { getAvsAction } from "./actions/getAvs";
import { getAvsMetadataAction } from "./actions/getAvsMetadata";

export const eigenAvsPlugin: Plugin = {
    name: "eigenavs",
    description: "EigenLayer AVS plugin for Eliza - provides operator and AVS data and metadata",
    actions: [
        getOperatorAction,
        getOperatorMetadataAction,
        getAvsAction,
        getAvsMetadataAction
    ],
    // Evaluators can be added later if needed
    evaluators: [],
    // Providers can be added later if needed
    providers: [],
};

export default eigenAvsPlugin;