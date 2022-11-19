import { useEffect, useState } from 'react';
import './App.css';
import User from './User';

interface User {
  id: number;
  name: string;
}

function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    // Initial load
    if (count === 0) {
      loadUsers();
    }
  });

  const loadUsers = (newCount?: number) => {
    const value = newCount ?? count;

    setCount(value + 1);

    fetch(`http://localhost:80?count=${value}`)
      .then((response) => response.json())
      .then(setUsers);
  };

  return (
    <div>
      <h1>Users</h1>
      <button onClick={() => {
        setCount(count + 1);

        loadUsers();
      }}>Increase count</button>
      <span> or </span>
      <input
        type="number"
        onChange={(e) => {
          const value = e.target.valueAsNumber;

          if (Number.isNaN(value)) {
            return loadUsers(0);
          }

          loadUsers(value);
        }} />
      <hr />
      <div id='users'>
        {
          users == null
            ? <i>Loading...</i>
            : users.map((user) => {
              return <User key={user.id} id={user.id} name={user.name} />;
            })
        }
      </div>
    </div>
  );
}

export default App;
