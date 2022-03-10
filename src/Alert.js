import { useEffect } from "react";

const Alert = function ({ msg, type, removeAlert, list }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [list]);
  return (
    <article>
      <div className={`alert-${type}`}>{msg}</div>
    </article>
  );
};

export default Alert;
