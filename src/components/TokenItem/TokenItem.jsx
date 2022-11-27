import React from "react";

const TokenItem = ({ name, symbol, img, balance }) => {
  return (
    <div className="flex justify-around bg-white mb-3 py-4 mx-3 rounded-2xl">
      <div className="flex items-center flex-[0.6] pl-6">
        <img src={img} className="w-6" />
        <h2 className="text-xl font-Grotesk ml-1 mr-3">{name}</h2>
        <p className="text-sm text-gray-400">{symbol}</p>
      </div>

      <p className="font-semibold text-xl flex-[0.4]">{balance.toFixed(2)}</p>
    </div>
  );
};

export default TokenItem;
