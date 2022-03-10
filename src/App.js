import "./App.css";
import { useState } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState([]);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!item) {
      // display alert

      setAlert({ show: true, msg: "please enter an item", type: "danger" });
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
      setAlert({ show: true, msg: "value changed", type: "success" });
      setItem("");
      setIsEditing(null);
    } else {
      const newItems = { id: new Date().getTime().toString(), title: item };
      setList([...list, newItems]);
      setAlert({ show: true, msg: "item added", type: "success" });
      setItem("");
    }
  };

  const removeItem = (id) => {
    const filtered = list.filter((li) => li.id !== id);

    setList(filtered);
  };

  const removeAlert = () => {
    setAlert({ show: false, msg: "", type: "" });
  };

  const editItem = (id) => {
    const edited = list.find((li) => li.id === id);
    setIsEditing(true);
    console.log(edited);
    setEditID(id);
    setItem(edited.title);
  };

  return (
    <section className="container">
      {alert.show && <Alert {...alert} removeAlert={removeAlert} list={list} />}
      <h3>To do list</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="e.g. Daniel's party"
          onChange={(e) => setItem(e.target.value)}
          value={item}
        />
        <button className="btn"> {isEditing ? "edit" : "add to list"}</button>
      </form>
      {list.length > 0 && (
        <div>
          <List list={list} removeItem={removeItem} editItem={editItem} />
          <button
            className="btn-clear"
            onClick={() => {
              setList("");
              setAlert({ show: true, msg: "cleared", type: "danger" });
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
