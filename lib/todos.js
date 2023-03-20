export async function getAllTodos() {
    const res = await fetch('https://my-json-server.typicode.com/sjaakvdbrom/react-todo-with-api/todos');
    return res.json();
}

export async function getAllCategories() {
    const res = await fetch('https://my-json-server.typicode.com/sjaakvdbrom/react-todo-with-api/categories');
    return res.json();
}
