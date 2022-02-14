import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { patchComment } from '../utils/Api';
import moment from 'moment';

// import styles
import './CommentCard.css';

export default function CommentCard({ comment, deleteCommentHandler }) {
  const [votes, setVotes] = useState(Number(comment.votes));
  const [voted, setVoted] = useState(false);
  const { username, authUser } = useAuth();

  const handleUpVotes = (num) => {
    setVoted(true);
    setVotes((curr) => {
      return curr + num;
    });
    patchComment(comment.comment_id, {
      inc_votes: +1,
    });
  };

  const handleDownVotes = (num) => {
    setVoted(false);
    setVotes((curr) => {
      return curr + num;
    });
    patchComment(comment.comment_id, {
      inc_votes: -1,
    });
  };


  return (
    <div className='comment-container' key={comment.comment_id}>
      <div className='comments-profile-picture-container'>
        <img
          className='profile-picture'
          src={require(`../images/profile-picture-${comment.author}.png`)}
          alt={comment.author}
        />
      </div>
      <div className='comment-header'>
        <div className='comment-body'>
          <div className='comment-author-date'>
            <div className='authors-name'>{comment.author}</div>
            <div className='comment-date'>{`${moment
              .utc(comment.created_at)
              .format('MMM Do, YYYY')}`}</div>
          </div>

          <div>{comment.body} </div>
        </div>

        <div className='comment-footer'>
          <div className='vote-container'>
            {!voted && (
              <div className='votes-up' onClick={() => handleUpVotes(1)}>
                <AiOutlineHeart />
              </div>
            )}
            {voted && (
              <div className='votes-down' onClick={() => handleDownVotes(-1)}>
                <AiFillHeart />
              </div>
            )}

            <div>{String(votes) + ' Likes'}</div>
          </div>

          {authUser && username === comment.author && (
            <div className='button-container'>
              <button
                className='comment-delete-btn'
                onClick={() => deleteCommentHandler(comment.comment_id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
