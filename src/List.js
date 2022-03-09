import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = function ({ list }) {
  return (
    <article>
      {list.map((li) => {
        const { id, title } = li;
        return (
          <div key={id}>
            {title}
            <button>
              <FaEdit />
            </button>
            <button>
              <FaTrash />
            </button>
          </div>
        );
      })}
    </article>
  );
};

export default List;
