import { useState } from 'react';
import type { Todo, FilterType } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
      />

      <span className="todo-text">{todo.text}</span>

      <button
        onClick={() => onDelete(todo.id)}
        className="delete-btn"
        aria-label="Sil"
      >
        🗑
      </button>
    </li>
  );
}

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const addTodo = () => {
    if (!input.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
    setInput('');
  };

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const completedCount = todos.filter(t => t.completed).length;
  const remainingCount = todos.length - completedCount;

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const filters: FilterType[] = ['all', 'active', 'completed'];

  return (
    <div className="todo-app">
      <h2>✅ To-Do Siyahısı</h2>

      <p className="stats">
        <span>{remainingCount} qalıb</span>
        <span>{completedCount} tamamlandı</span>
      </p>

      <div className="input-row">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="Yeni tapşırıq yaz..."
          className="todo-input"
        />

        <button onClick={addTodo} className="add-btn">
          + əlavə et
        </button>
      </div>

      <div className="filters">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
          >
            {f === 'all' ? 'Hamısı' : f === 'active' ? 'Aktiv' : 'Tamamlandı'}
          </button>
        ))}
      </div>

      {filteredTodos.length === 0 ? (
        <p className="empty-msg">
          {filter === 'completed'
            ? 'Hələ tamamlanmış tapşırıq yoxdur.'
            : 'Siyahı boşdur!'}
        </p>
      ) : (
        <ul className="todo-list">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      )}

      {completedCount > 0 && (
        <button onClick={clearCompleted} className="clear-btn">
          Tamamlananları sil ({completedCount})
        </button>
      )}
    </div>
  );
}

export default TodoApp;