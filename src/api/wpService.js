// const API0 = "https://cms.alena15world.ru/wp-json/wp/v2";
const API = "https://cms.alena15world.ru/wp-json";

export async function getPosts() {
  const response = await fetch(`${API}/wp/v2/posts`);
  // const response = await fetch(`${API0}/posts?categories=2`);
  // const response = await fetch(`${API}/wp/v2/posts?categories=2`);

  if (!response.ok) {
    throw new Error("Error loading posts");
  }

  const data = await response.json();

  return data;
}

export async function createPost(token) {
  const response = await fetch(`${API}/wp/v2/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: "Test post from React",
      content: "Hello from React 🚀",
      status: "publish",
    }),
  });

  const data = await response.json();

  return data;
}
