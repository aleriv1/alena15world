const API = "https://cms.alena15world.ru/wp-json/wp/v2";

export async function getPosts() {
  // const response = await fetch(`${API}/posts`);
  const response = await fetch(`${API}/posts?categories=2`);

  if (!response.ok) {
    throw new Error("Error loading posts");
  }

  const data = await response.json();

  return data;
}
