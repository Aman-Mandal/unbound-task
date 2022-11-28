import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-gray-400" />
    </div>
  );
};

export default Loader;
