const baseURL = "http://localhost:8080";
export async function getTodo() {
  const res = await fetch(`${baseURL}/api/todos`);
  return await res.json();
}

export async function addTodo(text: string) {
  const res = await fetch(`${baseURL}/api/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Failed to add todo");
  return await res.json();
}
