import AddressInput from "../AddressInput";
import { useSelectedAddress } from "../../state";

export default function Sidebar() {
    const updateSelectedAddress = useSelectedAddress((state) => state.updateSelectedAddress);
    return (
        <div className="flex flex-col">
            <div>
                <AddressInput onSubmit={updateSelectedAddress} />
            </div>
            <div>
                {/* sidebar options to navigate */}
            </div>
        </div>
    )
}

