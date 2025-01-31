import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider,createRoutesFromElements} from 'react-router-dom'
import { Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import Navbar from './components/Navbar.jsx'
import List from './components/List.jsx'
import Operator from './components/Operator.jsx'
import AVS from './components/AVS.jsx'
import AVS1 from './components/AVS1.jsx'
import Operator2 from './components/Operator2.jsx'
import Mapping from './components/Mapping.jsx'
import Move from './components/Move.jsx'

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  sepolia,
  optimismGoerli,
  arbitrumGoerli,
  polygonMumbai,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'e7fa7d19fd057ecd9403a0e89bd62b8b',
  chains: [sepolia, optimismGoerli, arbitrumGoerli, polygonMumbai],
  ssr: false
});

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route path='/' element={<Home/>}/>
    <Route path='/list' element={<List/>}/>
    <Route path='/operator' element={<Operator/>}/>
    <Route path='/operator2' element={<Operator2/>}/>
    <Route path='/avs' element={<AVS/>}/>
    <Route path='/avs1' element={<AVS1/>}/>
    <Route path='/map' element={<Mapping/>}/>
    <Route path='/move' element={<Move/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <WagmiProvider config={config}>
  <QueryClientProvider client={queryClient}>
    <RainbowKitProvider>
   <Navbar/>
   <RouterProvider router={router}/>
    </RainbowKitProvider>
  </QueryClientProvider>
  </WagmiProvider>
  </React.StrictMode>,
)



// dune api key -   ddZZbqTrQABnH094HfYqqgzb6TW6KpaE