import { useEffect, useState } from "react";
import { getTodo, addTodo } from "../api";
export default function Page() {
  const [todos, setTodos] = useState<{ id: string; text: string }[]>([]);
  const [value, setValue] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    getTodo().then((arr) => {
      setTodos(arr);
    });
  }, []);
  const handleSubmit = async () => {
    setLoading(true);
    await addTodo(value);
    setTodos(await getTodo());
    setValue("");
    setLoading(false);
  };
  return (
    <main>
      <h2>version: useState</h2>
      <fieldset role="group">
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={isLoading}
          onKeyUp={(e) => {
            if (e.key === "Enter" && !!value) {
              handleSubmit();
            }
          }}
        />
        <button onClick={handleSubmit} disabled={!value || isLoading}>
          submit
        </button>
      </fieldset>
      <ul>
        {todos.map((todo) => {
          return <li key={todo.id}>{todo.text}</li>;
        })}
      </ul>
    </main>
  );
}
