import { useEffect, useState } from "react";
import { getTodo, addTodo } from "../api";
export default function Page() {
  const [todos, setTodos] = useState<
    { id: string; text: string; sending?: boolean }[]
  >([]);
  const [value, setValue] = useState<string>("");
  // const [isLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    getTodo().then((arr) => {
      setTodos(arr);
    });
  }, []);
  const handleSubmit = async () => {
    // optimistic update todos
    setValue("");
    setTodos([
      ...todos,
      {
        id: Math.random().toString(32).slice(2),
        text: value + "<-from manually op->",
        sending: true,
      },
    ]);
    // loading status should work in background ?
    // setLoading(true);
    // update action
    await addTodo(value);
    // refetch todos from server
    setTodos(await getTodo());
    // setLoading(false);
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
          onKeyUp={(e) => {
            if (e.key === "Enter" && !!value) {
              handleSubmit();
            }
          }}
        />
        <button onClick={handleSubmit} disabled={!value}>
          submit
        </button>
      </fieldset>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id} aria-busy={todo.sending}>
              {todo.text}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
