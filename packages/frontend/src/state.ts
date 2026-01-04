import { createPublicClient, http, PublicClient } from 'viem';
import { mainnet } from 'viem/chains';
import { create } from 'zustand';
import { Transaction } from './interfaces';

// -- Address state --
type SelectedAddressState = {
    address: string,
    updateSelectedAddress: (newAddress: string) => void,
    resetSelectedAddress: () => void
}

export const useSelectedAddress = create<SelectedAddressState>((set) => ({
    address: '',
    updateSelectedAddress: (newAddress: string) => set({ address: newAddress }),
    resetSelectedAddress: () => set({ address: '' })
}))

// -- On Chain Provider --
type OnChainProvider = {
    providerClient: PublicClient,
    setPublicClient: (client: PublicClient) => void
}

export const useOnChainClient = create<OnChainProvider>((set) => ({
    providerClient: createPublicClient({
        chain: mainnet,
        transport: http()
    }),
    setPublicClient: (client: PublicClient) => set({ providerClient: client })
}))

// -- Selected Transaction --
type SelectedTransaction = {
    transaction: Transaction | null,
    setTransaction: (txn: Transaction | null) => void
}

export const useSelectedTransaction = create<SelectedTransaction>((set) => ({
    transaction: null,
    setTransaction: (txn: Transaction | null) => set({ transaction: txn })
}))