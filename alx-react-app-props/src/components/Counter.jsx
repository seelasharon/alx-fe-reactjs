import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div style={{ textAlign: 'center', margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2>Counter</h2>
      <p style={{ fontSize: '1.5em', margin: '10px 0' }}>{count}</p>
      <button onClick={increment} style={{ marginRight: '10px', padding: '5px 10px' }}>Increment</button>
      <button onClick={decrement} style={{ marginRight: '10px', padding: '5px 10px' }}>Decrement</button>
      <button onClick={reset} style={{ padding: '5px 10px' }}>Reset</button>
    </div>
  );
}

export default Counter;
