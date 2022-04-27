import './App.css';
import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};

function App() {
  const [item, setItem] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState([]);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!item) {
      // display alert

      setAlert({ show: true, msg: 'please enter an item', type: 'danger' });
    } else if (item && isEditing) {
      // deal with the editing

      setList(
        list.map((li) => {
          if (li.id === editID) {
            return { ...li, title: item };
          }

          return li;
        })
      );
      setAlert({ show: true, msg: 'value changed', type: 'success' });
      setItem('');
      setIsEditing(null);
    } else {
      const newItems = { id: new Date().getTime().toString(), title: item };
      setList([...list, newItems]);
      setAlert({ show: true, msg: 'item added', type: 'success' });
      setItem('');
    }
  };

  const removeItem = (id) => {
    const filtered = list.filter((li) => li.id !== id);

    setList(filtered);
  };

  const removeAlert = () => {
    setAlert({ show: false, msg: '', type: '' });
  };

  const editItem = (id) => {
    const edited = list.find((li) => li.id === id);
    setIsEditing(true);
    console.log(edited);
    setEditID(id);
    setItem(edited.title);
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <section className='container'>
      {alert.show && <Alert {...alert} removeAlert={removeAlert} list={list} />}
      <h3>Grocery Bud</h3>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='e.g. Spaghetti'
          onChange={(e) => setItem(e.target.value)}
          value={item}
        />
        <button className='btn'> {isEditing ? 'edit' : 'add to list'}</button>
      </form>
      {list.length > 0 && (
        <div>
          <List list={list} removeItem={removeItem} editItem={editItem} />
          <button
            className='btn-clear'
            onClick={() => {
              setList('');
              setAlert({ show: true, msg: 'cleared', type: 'danger' });
            }}
          >
            clear item
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
