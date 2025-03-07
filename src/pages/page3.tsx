import {
  useEffect,
  useState,
  useOptimistic,
  useTransition,
  useRef,
} from "react";
import { getTodo, addTodo } from "../api";
export default function Page() {
  const [todos, setTodos] = useState<{ id: string; text: string }[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransaction] = useTransition();
  const [optimisticTodos, setOptimisticTodos] = useOptimistic<
    { id: string; text: string; sending?: true }[],
    string
  >(todos, (state, text) => {
    return [
      ...state,
      {
        id: Math.random().toString(32).slice(2),
        text: text + "<-from op->",
        sending: true,
      },
    ];
  });
  useEffect(() => {
    getTodo().then((arr) => {
      setTodos(arr);
    });
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(formRef.current!);
    const value = fd.get("text") as string;
    if (!value) return;
    setLoading(true);
    // why setloading not work?
    setOptimisticTodos(value);
    await addTodo(value);
    setTodos(await getTodo());
    setLoading(false);
    formRef.current?.reset();
  };
  console.log({ isLoading, isPending });
  return (
    <div>
      <h2>version: useOptimistic</h2>
      <form
        ref={formRef}
        onSubmit={(e: React.FormEvent) =>
          startTransaction(() => handleSubmit(e))
        }
      >
        <fieldset role="group">
          <input name="text" type="text" disabled={isLoading} />
          <button type="submit" disabled={isLoading}>
            submit
          </button>
        </fieldset>
      </form>

      <ul>
        {optimisticTodos.map((todo) => {
          return (
            <li key={todo.id}>
              {todo.text}
              {todo.sending && <b>sending</b>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
