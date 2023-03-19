export async function getSortedPostsData() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    return res.json();
}
