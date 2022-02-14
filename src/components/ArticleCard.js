import React from 'react';
import { Link } from 'react-router-dom';
import './ArticleCard.css';
import moment from 'moment';

export default function ArticleCard({ article }) {
  const { article_id, title } = article;
  return (
    <div className='article-card'>
      <div className='top-row-container'>
        <div className='profile-picture-container'>
          <img
            className='profile-picture'
            src={require(`../images/profile-picture-${article.author}.png`)}
            alt={article.author}
          />
        </div>
        <div className='author-date-containter'>
          <div>{article.author}</div>
          <div className='date'>{`${moment
            .utc(article.created_at)
            .format('MMM Do, YYYY')}`}</div>
        </div>
      </div>
      <Link to={`/articles/${article_id}`}>
        <h2 className='article-title'>{title}</h2>
      </Link>

      <div className='topic'># {article.topic}</div>
      <div className='comments-votes-container'>
        <div className='votes'>♡ {article.votes}</div>
        <div className='comments'> {article.comment_count} Comments</div>
      </div>
    </div>
  );
}
