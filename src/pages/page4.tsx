import { useState, use, Suspense, memo } from "react";
import { getTodo, addTodo } from "../api";

const Todos = memo(
  ({
    todoPromise,
  }: {
    todoPromise: Promise<{ id: string; text: string; sending?: boolean }[]>;
  }) => {
    const todos = use(todoPromise);
    return (
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id} aria-busy={todo.sending}>
              {todo.text}
            </li>
          );
        })}
      </ul>
    );
  }
);

const TodoContainer = memo(() => {
  const todos = getTodo();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Todos todoPromise={todos} />
    </Suspense>
  );
});
export default function Page() {
  //   const [todos, setTodos] = useState<
  //     { id: string; text: string; sending?: boolean }[]
  //   >([]);
  // getTodo renders every time
  const [value, setValue] = useState<string>("");
  // const [isLoading, setLoading] = useState<boolean>(false);
  //   useEffect(() => {
  //     getTodo().then((arr) => {
  //       setTodos(arr);
  //     });
  //   }, []);
  const handleSubmit = async () => {
    // optimistic update todos
    // setValue("");
    // setTodos([
    //   ...todos,
    //   {
    //     id: Math.random().toString(32).slice(2),
    //     text: value + "<-from manually op->",
    //     sending: true,
    //   },
    // ]);
    // loading status should work in background ?
    // setLoading(true);
    // update action
    await addTodo(value);
    // refetch todos from server
    // setTodos(await getTodo());
    // setLoading(false);
  };
  return (
    <main>
      <h2>version: use</h2>
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
      <TodoContainer />
    </main>
  );
}
