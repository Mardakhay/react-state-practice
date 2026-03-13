import { useState } from 'react';
import type { CounterProps } from '../types';

function Counter({ initialValue = 0, min = 0, max = 999 }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  const increment = (step: number = 1) => {
    setCount(prev => Math.min(max, prev + step));
  };

  const decrement = (step: number = 1) => {
    setCount(prev => Math.max(min, prev - step));
  };

  const reset = () => setCount(initialValue);

  const colorClass =
    count === 0
      ? 'zero'
      : count <= max * 0.4
      ? 'low'
      : count <= max * 0.7
      ? 'medium'
      : 'high';

  return (
    <div className="counter">
      <h2>Sayğaç</h2>

      <div className={`counter-display ${colorClass}`}>
        {count}
      </div>

      <p className="counter-range">Min: {min} – Maks: {max}</p>

      <div className="counter-buttons">
        <button onClick={() => decrement(10)} disabled={count <= min} className="btn btn-dec">
          -10
        </button>
        <button onClick={() => decrement(5)} disabled={count <= min} className="btn btn-dec">
          -5
        </button>
        <button onClick={() => decrement(1)} disabled={count <= min} className="btn btn-dec">
          -1
        </button>

        <button onClick={reset} className="btn btn-reset">
          Sıfırla
        </button>

        <button onClick={() => increment(1)} disabled={count >= max} className="btn btn-inc">
          +1
        </button>
        <button onClick={() => increment(5)} disabled={count >= max} className="btn btn-inc">
          +5
        </button>
        <button onClick={() => increment(10)} disabled={count >= max} className="btn btn-inc">
          +10
        </button>
      </div>

      <div className="progress-wrapper">
        <div
          className="progress-fill"
          style={{ width: `${Math.round(((count - min) / (max - min)) * 100)}%` }}
        />
      </div>

      <p className="progress-label">
        {Math.round(((count - min) / (max - min)) * 100)}% (maks-dan)
      </p>
    </div>
  );
}

export default Counter;