import React, { useState, useEffect } from "react";

const HomePage = () => {
  let [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  let getPosts = async () => {
    let response = await fetch("http://127.0.0.1:8000/blog-api/posts/");
    let data = await response.json();
    setPosts(data);
  };

  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <h5>{post.body}</h5>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HomePage;
