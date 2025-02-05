import { ActionExample } from "@elizaos/core";

export const getOperatorExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you show me information about the operator AlignedNode?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll fetch the operator data for AlignedNode.",
                action: "EIGEN_GET_OPERATOR",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "What's the TVL of operator 0x1b03d708aee5bdc46dbb09537ce455e1f75adc4d?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me get the operator data to check their TVL.",
                action: "EIGEN_GET_OPERATOR",
            },
        }
    ]
];

export const getOperatorMetadataExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Tell me more about the operator AlignedNode",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll fetch the metadata for AlignedNode to tell you more about them.",
                action: "EIGEN_GET_OPERATOR_METADATA",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "What's the website and Twitter of this operator?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me get the operator's social media information.",
                action: "EIGEN_GET_OPERATOR_METADATA",
            },
        }
    ]
];

export const getAvsExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "What's the total TVL of eoracle AVS?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll fetch the AVS data for eoracle to check their TVL.",
                action: "EIGEN_GET_AVS",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "How many operators does AVS 0x23221c5bb90c7c57ecc1e75513e2e4257673f0ef have?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me check the AVS data for that information.",
                action: "EIGEN_GET_AVS",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Show me the staking statistics for eoracle",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll retrieve the staking data for the eoracle AVS.",
                action: "EIGEN_GET_AVS",
            },
        }
    ]
];

export const getAvsMetadataExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "What is Ava Protocol about?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll fetch the AVS metadata to tell you about Ava Protocol.",
                action: "EIGEN_GET_AVS_METADATA",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you share the website and social media for eoracle AVS?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me get the AVS contact information for you.",
                action: "EIGEN_GET_AVS_METADATA",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I want to learn more about this AVS project.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll fetch the detailed information about this AVS.",
                action: "EIGEN_GET_AVS_METADATA",
            },
        }
    ]
];