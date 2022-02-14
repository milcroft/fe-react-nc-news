import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import {
  getCommentsByArticleId,
  deleteComment,
  postComment,
} from '../utils/Api';
import CommentCard from '../components/CommentCard';
import { RiDiscussLine } from 'react-icons/ri';

// styles
import '../views/Comments.css';

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { article_id } = useParams();
  const { authUser, username } = useAuth();

  useEffect(() => {
    let mounted = true;

    getCommentsByArticleId(article_id)
      .then(({ data }) => {
        if (mounted) {
          setComments(data.comments);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return function cleanup() {
      mounted = false;
    };
  }, [article_id, comments]);

  const deleteCommentHandler = (id) => {
    deleteComment(id);
    setComments((prevComments) => {
      return prevComments.filter((comment) => {
        return id !== comments.comment_id;
      });
    });
  };

  const resetForm = () => {
    setNewComment('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    postComment(article_id, {
      username: username,
      body: newComment,
    });
    resetForm();
  };

  return (
    <div className='comments-page-container'>
      <div className='comments-form-container'>
        <form className='new-comment-form' onSubmit={handleSubmit}>
          <label>
            <span>
              Discuss: <RiDiscussLine />
            </span>
            <textarea
              placeholder='Add to discussion'
              className='comments-text'
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment}
              disabled={!authUser}
            />
          </label>
          <div className='btn-container'>
            <button className='comment-btn' disabled={!newComment}>
              Submit
            </button>
            {!authUser && <Link to={`/login`}>Login</Link>}
          </div>
        </form>
      </div>
      {comments.map((comment) => {
        return (
          <div key={comment.comment_id}>
            <CommentCard
              comment={comment}
              deleteCommentHandler={deleteCommentHandler}
            />
          </div>
        );
      })}
    </div>
  );
}
