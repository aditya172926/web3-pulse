import AddressInput from "./AddressInput";
import { useSelectedAddress } from "../state";

export default function Sidebar() {
    const updateSelectedAddress = useSelectedAddress((state) => state.updateSelectedAddress);
    return (
        <AddressInput onSubmit={updateSelectedAddress} />
    )
}

