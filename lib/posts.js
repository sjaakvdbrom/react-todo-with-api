export async function getAllTodos() {
    const res = await fetch('https://my-json-server.typicode.com/sjaakvdbrom/react-todo-with-api/todos');
    return res.json();
}
