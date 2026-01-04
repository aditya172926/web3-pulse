export function format_slice(str: string, maxLength: number = 10): string {
    if (str?.length <= maxLength) return str;
    return str?.slice(0, maxLength) + "...";
}

export const formatTimestamp = (timestamp: string) => {
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleString();
};

export const hexToDecimal = (hex: string) => {
    return parseInt(hex, 16).toLocaleString();
};

export const formatValue = (value: string) => {
    const ethValue = parseInt(value) / 1e18;
    return ethValue.toFixed(6);
};

export const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
};