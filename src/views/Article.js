import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById, patchArticleById } from '../utils/Api';
import moment from 'moment';
import './Article.css';
import { useCount } from '../hooks/useCount';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import Comments from '../views/Comments';
import Loader from '../components/Loader';
import Error from '../components/Error';

export default function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [author, setAuthor] = useState('loading');
  const { count, increaseCount, resetCount } = useCount(null);
  const [voted, setVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const [errorStatusData, setErrorStatusData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then(({ data }) => {
        setIsLoading(false);
        setArticle(data.article);
        setAuthor(data.article.author);
      })
      .catch(function (error) {
        if (error.response) {
          setIsLoading(false);
          setIsError(true);
          setErrorData(error.response.data.msg);
          setErrorStatusData(error.response.status);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      });
  }, [article_id, author]);

  const plusVote = () => {
    setVoted(true);
    increaseCount();
    patchArticleById(article_id, {
      inc_votes: 1,
    });
  };

  const minusVote = () => {
    setVoted(false);
    resetCount();
    patchArticleById(article_id, {
      inc_votes: -1,
    });
  };

  return (
    <>
      {isLoading && <Loader />}


      {isError && (
        <Error errorData={errorData} errorStatusData={errorStatusData} />
      )}
      {!isError && (
        <div>
          <div className='card-page-article'>
            <div className='vote-container'>
              {!voted && (
                <div className='votes-up' onClick={plusVote}>
                  <AiOutlineHeart className='icon-arrow-drop-up' />
                </div>
              )}
              {voted && (
                <div className='votes-down' onClick={minusVote}>
                  <AiFillHeart className='icon-arrow-drop-up' />
                </div>
              )}

              <div>{String(count + article.votes)}</div>
            </div>
            <img
              className='profile-page-picture'
              src={require(`../images/profile-picture-${author}.png`)}
              alt={article.author}
            />
            <span>{article.author}</span>

            <h1 className='article-page-title'>{article.title}</h1>
            <span># {article.topic}</span>
            <br></br>

            <span>
              Published:
              {`${moment.utc(article.created_at).format('MMM Do, YYYY')}`}
            </span>
            <span className='border-title'></span>
            <p>{article.body}</p>
            <span>
              Comments<strong>({article.comment_count})</strong>
            </span>
          </div>

          <Comments artcle={article} />
        </div>
         

      )}

    </>
  );
}
