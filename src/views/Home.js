import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RiSortDesc, RiSortAsc } from 'react-icons/ri';

//import from api
import { getArticles } from '../utils/Api';

// import from components
import ArticleCard from '../components/ArticleCard';
import Loader from '../components/Loader';
import Error from '../components/Error';

//import styles
import './Home.css';

export default function Home() {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [order, setOrder] = useState('desc');
  const [sort_by, setSortBy] = useState('comment_count');
  const [search, setSearch] = useState('');
  const [filterArticles, setFilterArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const [errorStatusData, setErrorStatusData] = useState(null);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getArticles(topic, sort_by, order)
      .then(({ data }) => {
        setIsLoading(false);
        setArticles(data.articles);
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
  }, [topic, sort_by, order]);

  const orderHandler = (e) => {
    e.preventDefault();
    if (order === 'desc') {
      setOrder('asc');
    } else {
      setOrder('desc');
    }
  };

  useEffect(() => {
    setFilterArticles(
      articles.filter((article) => {
        return article.title.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, articles]);

  return (
    <>
      {isError && (
        <Error errorData={errorData} errorStatusData={errorStatusData} />
      )}

      {!isError && (
        <>
          <div className='articles-container'>
         

            <div className='search-container'>
              <input
                className='search-box'
                type='text'
                placeholder='Search By Title....'
                onChange={(e) => setSearch(e.target.value)}
              ></input>
              <button className='order-by-button' onClick={orderHandler}>
                {order === 'desc' ? <RiSortDesc /> : <RiSortAsc />}
              </button>
            </div>

          

            <div className='button-selectors'>
              <button onClick={() => setSortBy('votes')}>Top</button>
              <button onClick={() => setSortBy('created_at')}>Latest</button>
              <button onClick={() => setSortBy('comment_count')}>
                Discussed
              </button>
            </div>
            <div className='hero-section'>
              <h1 className='topic-title'>{!topic ? 'News' : topic}</h1>
            </div>


            {isLoading && <Loader />}
            <div className='article-list'>
              <ul>
                {filterArticles.map((article) => {
                  return (
                    <ArticleCard article={article} key={article.article_id} />
                  );
                })}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}
