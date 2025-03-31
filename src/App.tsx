import React from 'react';
import './App.css';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [value, setValue] = React.useState('');
  const [todo, setTodo] = React.useState([] as Todo[]);
  const [filter, setFilter] = React.useState('all');
  const [filterTodo, setFilterTodo] = React.useState([] as Todo[]);

  React.useEffect(() => {
    if (filter === 'completed') {
      setFilterTodo(todo.filter((item) => item.completed));
    } else if (filter === 'active') {
      setFilterTodo(todo.filter((item) => !item.completed));
    } else {
      setFilterTodo(todo);
    }
  }, [filter, todo]);

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };
    setTodo([newTodo, ...todo]);
    setValue('');
    // console.log(todo.map((item) => item));
  };

  const removeList = () => {
    todo.map((item) => {
      if (item.completed === true) {
        setTodo(todo.filter((item) => !item.completed));
      }
    });
  };
  return (
    <div className="App">
      <div className="box">
        <h1>Todo List</h1>
        <div className="container">
          <div className="input-container">
            <input
              type="text"
              onChange={(e) => setValue(e.target.value)}
              value={value}
              className="input"
              placeholder="Напишите задачу"></input>
            <button onClick={addTodo} type="submit" className="button-add">
              Добавить
            </button>
          </div>
          <div className="filter">
            <button
              className={`button-filter`}
              style={filter === 'all' ? { backgroundColor: '#28a745' } : {}}
              onClick={() => setFilter('all')}>
              Все
            </button>
            <button
              className="button-filter"
              style={filter === 'active' ? { backgroundColor: '#28a745' } : {}}
              onClick={() => setFilter('active')}>
              Активные
            </button>
            <button
              className="button-filter"
              style={filter === 'completed' ? { backgroundColor: '#28a745' } : {}}
              onClick={() => setFilter('completed')}>
              Выполненные
            </button>
          </div>
          <div className="list">
            {filterTodo.map((item) => (
              <div key={item.id} className="todo-item">
                <input
                  className="todo-checkbox"
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => {
                    setTodo(
                      todo.map((todo) =>
                        todo.id === item.id ? { ...todo, completed: !todo.completed } : todo,
                      ),
                    );
                  }}
                />
                <span className="todo-title">{item.title}</span>
              </div>
            ))}
          </div>
          <div className="footer">
            <p>{todo.filter((item) => !item.completed).length} задач осталось</p>
            <button className="button-filter" onClick={removeList}>
              Удалить выполненные
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
