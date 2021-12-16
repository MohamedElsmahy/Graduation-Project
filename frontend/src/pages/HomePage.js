import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loadPosts } from '../actions/posts';

const HomePage = ({ loadPosts, posts }) => {
  // let [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  // let getPosts = async () => {
  //   let res = await axios.get('http://127.0.0.1:8000/blog-api/posts/');
  //   // let res = await fetch('http://127.0.0.1:8000/blog-api/posts/');
  //   if (res.status === 200) {
  //     let data = await res.json();
  //     setPosts(data.data);
  //   } else {
  //     setPosts(null);
  //   }
  // };

  return (
    <div>
      <h1>Home Page</h1>
      {posts && (
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <h5>{post.body}</h5>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { posts: state.posts.posts };
};

export default connect(mapStateToProps, { loadPosts })(HomePage);
