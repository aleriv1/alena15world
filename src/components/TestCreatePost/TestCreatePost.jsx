import { createPost } from "../../api/wpService";

export default function TestCreatePost() {
  const handleCreate = async () => {
    const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Ntcy5hbGVuYTE1d29ybGQucnUiLCJpYXQiOjE3NzM0MjUxNjIsIm5iZiI6MTc3MzQyNTE2MiwiZXhwIjoxNzc0MDI5OTYyLCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.ZNbYoGEduQZpOJtk5n_3ON1sLHc7wWIfWR2Z-aClqwc";

    const result = await createPost(token);

    console.log(result);
  };

  return <button onClick={handleCreate}>Create test post</button>;
}
