import React from 'react';

const StakingComponent = () => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-8 text-center min-h-[calc(100vh-4rem)]">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-400">
        I said you're too early!
      </h1>
      <p className="text-xl md:text-2xl text-gray-400 mb-16">
        Miner under construction
      </p>
      <div className="w-56 h-56 md:w-72 md:h-72 bg-white rounded-lg shadow-lg" />
    </div>
  );
};

export default StakingComponent;