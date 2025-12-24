import { createPublicClient, http, PublicClient } from 'viem';
import { mainnet } from 'viem/chains';
import {create} from 'zustand';

// -- Address state --
type SelectedAddressState = {
    address: string,
    updateSelectedAddress: (newAddress: string) => void,
    resetSelectedAddress: () => void
}

export const useSelectedAddress = create<SelectedAddressState>((set) => ({
    address: '',
    updateSelectedAddress: (newAddress: string) => set({address: newAddress}),
    resetSelectedAddress: () => set({address: ''})
}))

// -- On Chain Provider --
type OnChainProvider = {
    providerClient: PublicClient,
    setPublicClient: (client: PublicClient) => void
}

export const useOnChainClient = create<OnChainProvider>((set) => ({
    providerClient: createPublicClient({
        chain: mainnet,
        transport: http(`${import.meta.env.VITE_ALCHEMY_MAINNET_RPC_URL}/${import.meta.env.VITE_ALCHEMY_API_KEY}`)
    }),
    setPublicClient: (client: PublicClient) => set({providerClient: client})
}))