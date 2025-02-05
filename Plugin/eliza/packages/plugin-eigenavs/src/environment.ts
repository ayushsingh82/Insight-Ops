import { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

export const eigenEnvSchema = z.object({
    DUNE_API_KEY: z.string().min(1, "Dune API key is required"),
    DUNE_API_BASE_URL: z.string().default("https://api.dune.com/api/v1/eigenlayer"),
});

export type EigenConfig = z.infer<typeof eigenEnvSchema>;

export async function validateEigenConfig(
    runtime: IAgentRuntime
): Promise<EigenConfig> {
    try {
        const config = {
            DUNE_API_KEY: runtime.getSetting("DUNE_API_KEY"),
            DUNE_API_BASE_URL: runtime.getSetting("DUNE_API_BASE_URL") || "https://api.dune.com/api/v1/eigenlayer",
        };
        console.log('EigenLayer config: ', config);
        return eigenEnvSchema.parse(config);
    } catch (error) {
        console.log("EigenLayer config error:", error);
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join("\n");
            throw new Error(
                `EigenLayer API configuration validation failed:\n${errorMessages}`
            );
        }
        throw error;
    }
}

// Helper function to construct API endpoints
export function getEndpoints(baseUrl: string) {
    return {
        operator: {
            stats: `${baseUrl}/operator-stats`,
            metadata: `${baseUrl}/operator-metadata`
        },
        avs: {
            stats: `${baseUrl}/avs-stats`,
            metadata: `${baseUrl}/avs-metadata`
        }
    };
}

// Helper function to create request options
export function createRequestOptions(apiKey: string) {
    return {
        method: 'GET',
        headers: {
            'X-DUNE-API-KEY': apiKey
        }
    };
} 