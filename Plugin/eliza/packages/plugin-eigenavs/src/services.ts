import {
    OperatorData,
    OperatorMetadata,
    AVSData,
    AVSMetadata,
    OperatorResponse,
    AVSResponse
} from "./types";

import { getEndpoints, createRequestOptions } from "./environment";

export const createEigenLayerService = (apiKey: string, baseUrl: string) => {
    const endpoints = getEndpoints(baseUrl);
    const options = createRequestOptions(apiKey);

    const getOperatorData = async (operatorAddress: string): Promise<OperatorData> => {
        if (!apiKey || !operatorAddress) {
            throw new Error("Invalid parameters");
        }

        try {
            const response = await fetch(endpoints.operator.stats, {
                ...options,
                body: JSON.stringify({ operator_address: operatorAddress })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error?.message || response.statusText);
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error("EigenLayer Operator Stats API Error:", error.message);
            throw error;
        }
    };

    const getOperatorMetadata = async (operatorAddress: string): Promise<OperatorMetadata> => {
        if (!apiKey || !operatorAddress) {
            throw new Error("Invalid parameters");
        }

        try {
            const response = await fetch(endpoints.operator.metadata, {
                ...options,
                body: JSON.stringify({ operator_address: operatorAddress })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error?.message || response.statusText);
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error("EigenLayer Operator Metadata API Error:", error.message);
            throw error;
        }
    };

    const getAVSData = async (avsAddress: string): Promise<AVSData> => {
        if (!apiKey || !avsAddress) {
            throw new Error("Invalid parameters");
        }

        try {
            const response = await fetch(endpoints.avs.stats, {
                ...options,
                body: JSON.stringify({ avs_address: avsAddress })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error?.message || response.statusText);
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error("EigenLayer AVS Stats API Error:", error.message);
            throw error;
        }
    };

    const getAVSMetadata = async (avsAddress: string): Promise<AVSMetadata> => {
        if (!apiKey || !avsAddress) {
            throw new Error("Invalid parameters");
        }

        try {
            const response = await fetch(endpoints.avs.metadata, {
                ...options,
                body: JSON.stringify({ avs_address: avsAddress })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error?.message || response.statusText);
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error("EigenLayer AVS Metadata API Error:", error.message);
            throw error;
        }
    };

    // Helper function to get complete operator info
    const getCompleteOperatorInfo = async (operatorAddress: string): Promise<OperatorResponse> => {
        const [data, metadata] = await Promise.all([
            getOperatorData(operatorAddress),
            getOperatorMetadata(operatorAddress)
        ]);
        return { data, metadata };
    };

    // Helper function to get complete AVS info
    const getCompleteAVSInfo = async (avsAddress: string): Promise<AVSResponse> => {
        const [data, metadata] = await Promise.all([
            getAVSData(avsAddress),
            getAVSMetadata(avsAddress)
        ]);
        return { data, metadata };
    };

    return {
        getOperatorData,
        getOperatorMetadata,
        getAVSData,
        getAVSMetadata,
        getCompleteOperatorInfo,
        getCompleteAVSInfo
    };
};