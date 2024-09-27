// useCounter.js
import { useState } from 'react';

const useCounter = (initialValue = 0) => {
    const [count, setCount] = useState(initialValue);

    const increment = () => setCount(prevCount => prevCount + 1);
    const decrement = () => setCount(prevCount => prevCount - 1);
    const reset = () => setCount(initialValue);

    return { count, increment, decrement, reset };
};

export default useCounter;
