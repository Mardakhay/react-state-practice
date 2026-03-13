import { useState } from 'react';
import Counter from './components/Counter';
import TodoApp from './components/TodoApp';
import './App.css';

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={`app ${isDark ? 'dark' : ''}`}>
      <header className="app-header">
        <h1>React State Practice</h1>
        <p>useState Hook – Counter & To-Do</p>

        <button
          className="theme-toggle"
          onClick={() => setIsDark(prev => !prev)}
        >
          {isDark ? '☀️ Açıq Tema' : '🌙 Qaranlıq Tema'}
        </button>
      </header>

      <main className="app-main">
        <section className="section">
          <Counter initialValue={0} min={0} max={100} />
        </section>

        <section className="section">
          <TodoApp />
        </section>
      </main>
    </div>
  );
}

export default App;
