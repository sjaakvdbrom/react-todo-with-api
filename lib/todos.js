export async function getAllTodos() {
    const res = await fetch('https://my-json-server.typicode.com/sjaakvdbrom/react-todo-with-api/todos');
    return res.json();
}

export async function getCategory(id) {
    const res = await fetch(`https://my-json-server.typicode.com/sjaakvdbrom/react-todo-with-api/categories/${id}`);
    return res.json();
}
