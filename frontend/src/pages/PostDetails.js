import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadPost } from '../actions/posts';
import axios from 'axios';
import Cookies from 'js-cookie';

import Button from '@material-ui/core/Button';

const PostDetails = ({ loadPost, post, comments, likes, userId }) => {
  const [postDeleted, setPostDeleted] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    loadPost(id);
  }, []);

  const DeletePost = async () => {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    };

    try {
      const res = await axios.delete(
        `http://localhost:8000/blog-api/posts/${id}/`,
        config
      );
      if (res.status === 204) {
        setPostDeleted(true);
      }
    } catch (err) {}
  };

  if (postDeleted) return <Navigate replace to="/" />;

  const onSubmit = (e) => {
    e.preventDefault();
    DeletePost();
  };

  return (
    <>
      {post ? (
        <>
          <h3>{post.body}</h3>
          <h5>Likes: {likes.length}</h5>
          <ul>
            {comments.map((comment) => {
              return <li key={comment.id}>{comment.body}</li>;
            })}
          </ul>
        </>
      ) : (
        <h5>Post Not Found</h5>
      )}
      {userId === post.user && (
        <form onSubmit={(e) => onSubmit(e)}>
          <Button type="submit">
            <h4>Delete Post</h4>
          </Button>
        </form>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    post: state.post.post,
    comments: state.post.comments,
    likes: state.post.likes,
    userId: state.profile.id,
  };
};

export default connect(mapStateToProps, { loadPost })(PostDetails);
