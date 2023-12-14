// Counter.tsx

import React, { useState } from "react";

// Define the props interface (if any)
interface CounterProps {
  initialCount?: number;
}

// Define the Counter component
const Counter: React.FC<CounterProps> = ({ initialCount = 0 }) => {
  // State to manage the count
  const [count, setCount] = useState(initialCount);

  // Function to handle incrementing the count
  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button className="btn btn-primary" onClick={handleIncrement}>
        Increment
      </button>
    </div>
  );
};

export default Counter;
