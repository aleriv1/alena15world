import { useEffect, useState } from "react";
import { getPosts } from "../../api/wpService";
import styles from "./PostList.module.less";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((data) => {
      setPosts(data);
    });
  }, []);

  return (
    <div className={styles.diary}>
      <h1 className={styles.diary__title}>Diary</h1>

      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: "40px" }}>
          <h2
            dangerouslySetInnerHTML={{
              __html: post.title.rendered,
            }}
          />

          <div
            dangerouslySetInnerHTML={{
              __html: post.excerpt.rendered,
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default PostList;
