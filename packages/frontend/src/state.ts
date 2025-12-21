import {create} from 'zustand';

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