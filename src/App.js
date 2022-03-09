import "./App.css";
import { useState } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!item) {
      // display alert
    } else if (item && isEditing) {
      // deal with the editing
    } else {
      const newItems = { id: new Date().getTime().toString(), title: item };
      setList([...list, newItems]);

      setItem("");
    }
  };

  return (
    <section className="container">
      {alert.show && <Alert />}
      <h3>To do list</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="e.g. Daniel's party"
          onChange={(e) => setItem(e.target.value)}
          value={item}
        />
        <button className="btn"> {isEditing ? "add to list" : "edit"}</button>
      </form>
      {list.length > 0 && (
        <div>
          <List list={list} />
          <button onClick={() => setList("")}>clear item</button>
        </div>
      )}
    </section>
  );
}

export default App;
