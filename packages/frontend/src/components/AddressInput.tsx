import { useState } from 'react';

interface Props {
  onSubmit: (address: string) => void;
}

export default function AddressInput({ onSubmit }: Props) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value) {
      onSubmit(value.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex">
      <input
        type="text"
        className="border p-2 flex-1 rounded"
        placeholder="Enter Ethereum address"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Search
      </button>
    </form>
  );
}
