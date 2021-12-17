import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadPost } from '../actions/posts';
import axios from 'axios';
import Cookies from 'js-cookie';

import Button from '@material-ui/core/Button';

const PostDetails = ({ loadPost, post, userId }) => {
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
    // const body = JSON.stringify({
    //   withCredentials: true,
    // });

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
    <div>
      <h1>Home Page</h1>
      {post ? <h5>{post.body}</h5> : <h5>Post Not Found</h5>}
      {userId === post.user && (
        <form onSubmit={(e) => onSubmit(e)}>
          <Button type="submit">
            <h4>Delete Post</h4>
          </Button>
        </form>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { post: state.post.post, userId: state.profile.id };
};

export default connect(mapStateToProps, { loadPost })(PostDetails);
