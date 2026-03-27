const coins = [
  { id: "BTC", name: "Bitcoin", color: "from-orange-500 to-yellow-500" },
  { id: "ETH", name: "Ethereum", color: "from-blue-500 to-purple-500" },
  { id: "SOL", name: "Solana", color: "from-purple-500 to-pink-500" },
];

export default function CoinSelector({ selected, onSelect }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {coins.map((coin) => (
        <button
          key={coin.id}
          onClick={() => onSelect(coin.id)}
          className={`flex-1 min-w-[100px] px-6 py-4 rounded-xl font-semibold transition-all ${
            selected === coin.id
              ? `bg-gradient-to-r ${coin.color} text-white shadow-lg scale-105`
              : "bg-gray-800 text-gray-400 hover:bg-gray-700"
          }`}
        >
          <div className="text-sm opacity-75">{coin.name}</div>
          <div className="text-xl">{coin.id}</div>
        </button>
      ))}
    </div>
  );
}
