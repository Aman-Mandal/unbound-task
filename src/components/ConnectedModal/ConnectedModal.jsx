import React from "react";

const ConnectedModal = () => {
  return (
    <div className="bg-[#1e1e1e] w-full pb-10">
      <div className="w-fit mx-auto rounded-lg bg-white px-10 py-4">
        <h2 className="font-Grotesk text-2xl text-red-600 mb-3 font-semibold">
          Warning!! 🔺
        </h2>
        <p className="text-md font-medium">
          Please Connect Wallet to see the latest balance of your tokens!!
        </p>
      </div>
    </div>
  );
};

export default ConnectedModal;
