interface Props {
    text: string,
    backgroundColor: string
}

export default function Badge({ text, backgroundColor }: Props) {
    return (
        <div className={`inline-flex w-fit items-center text-sm rounded-full ${backgroundColor}`}>
            <p className="text-white px-2">{text}</p>
        </div>
    )
}