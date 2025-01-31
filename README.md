# InsightOps

InsightOps is a platform that integrates multiple tools and APIs to provide comprehensive tracking of operators, AVS (Active Verification Service), and their related activities. The platform leverages the **Puffer module**, **Dune API**, and **Movement Labs** to fetch and display relevant data.

## Puffer

We have fetched the information from the **Puffer module** using contracts. Corresponding to the Puffer module, we have the following:
- **Puffer module address**
- **Restaking operator address**

You can track activities on our website by searching with these addresses.

## Dune

We have utilized the **Dune API** for the following:
- Track **TVL (Total Value Locked)** data in the form of charts and numerical values.
- Track **AVS metadata** by address, including details like:
  - AVS Name
  - Functionality
  - Logo
  - Twitter URL
  - Website URL
- Track **Operator TVL** and metadata by address, including:
  - Operator Name
  - Functionality
  - Logo
  - Twitter URL
  - Website URL
- Track the **relationship between Operators and AVS** by providing either an operator or AVS address.

## Movement Labs

We have integrated **Movement Labs** using the **Aptos API** to:
- Track account data.
- Fetch resources.
- Fetch modules from Aptos-based networks.

# React + Vite

This project uses **React** with **Vite** for a fast development experience with Hot Module Replacement (HMR) and ESLint rules.

## Setup

To set up the project with **React + Vite**, the following official plugins are used:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) which uses [Babel](https://babeljs.io/) for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) which uses [SWC](https://swc.rs/) for Fast Refresh.

These provide an efficient and minimal setup to get started quickly with React and Vite.
This format is Markdown-compatible and is suitable for a README.md file.






You said:
add we added contract for squaring avs 
ChatGPT said:
ChatGPT
Here’s the updated README.md with the addition of the contract for the squaring AVS:

md
Copy code
# InsightOps

InsightOps is a platform that integrates multiple tools and APIs to provide comprehensive tracking of operators, AVS (Active Verification Service), and their related activities. The platform leverages the **Puffer module**, **Dune API**, and **Movement Labs** to fetch and display relevant data.

## Puffer

We have fetched the information from the **Puffer module** using contracts. Corresponding to the Puffer module, we have the following:
- **Puffer module address**
- **Restaking operator address**

You can track activities on our website by searching with these addresses.

## Dune

We have utilized the **Dune API** for the following:
- Track **TVL (Total Value Locked)** data in the form of charts and numerical values.
- Track **AVS metadata** by address, including details like:
  - AVS Name
  - Functionality
  - Logo
  - Twitter URL
  - Website URL
- Track **Operator TVL** and metadata by address, including:
  - Operator Name
  - Functionality
  - Logo
  - Twitter URL
  - Website URL
- Track the **relationship between Operators and AVS** by providing either an operator or AVS address.

## Movement Labs

We have integrated **Movement Labs** using the **Aptos API** to:
- Track account data.
- Fetch resources.
- Fetch modules from Aptos-based networks.

## Squaring AVS Contract

We have added and deployed a contract for **Incredible Squaring AVS**, which demonstrates the core functionality of a minimum viable AVS with full **Eigenlayer** integration. This contract showcases how an off-chain computation (squaring a number) can be performed as part of the work operators commit to. Here's the flow:
- The off-chain computation is signed by multiple Operators.
- Operator signatures are aggregated.
- The final value is validated and written on-chain.

This contract has been deployed on **Movement Labs**.

# React + Vite

This project uses **React** with **Vite** for a fast development experience with Hot Module Replacement (HMR) and ESLint rules.
