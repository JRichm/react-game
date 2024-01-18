export default function ChatContainer() {
    return (
        <div className="bg-gray-100">
            <div className="w-full p-3 flex flex-col gap-2">
                <div className="bg-gray-200 p-2 min-h-[150px] flex flex-col justify-end">
                    <p><em className="font-semibold text-amber-600 not-italic"> iPhone4s </em> ggs</p>
                    <p><em className="font-semibold text-cyan-300 not-italic"> Clamboyant </em> We aint no mountain goats up in this</p>
                    <p><em className="font-semibold text-purple-700 not-italic"> Pop Smoke </em> you didnt know i could sing?</p>
                </div>
                <input className="w-full bg-gray-200 h-8 rounded p-2" placeholder="type here to chat"></input>
            </div>
        </div>
    )
}