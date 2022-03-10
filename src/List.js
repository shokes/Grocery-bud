import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = function ({ list, removeItem }) {
  return (
    <article>
      {list.map((li) => {
        const { id, title } = li;
        return (
          <div className="flex" key={id}>
            {title}

            <div>
              <button className="btn-edit">
                <FaEdit />
              </button>
              <button onClick={() => removeItem(id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        );
      })}
    </article>
  );
};

export default List;
