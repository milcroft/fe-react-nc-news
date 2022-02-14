import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { useAuth } from '../hooks/useAuth';
import { getTopics } from '../utils/Api';
import { useParams } from 'react-router-dom';

//components

//styles
import './Navbar.css';

export default function Navbar() {
  const [topicsData, setTopicsData] = useState([]);
  const [isToggle, setIsToggle] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [activate, setActivate] = useState(true);
  const { authUser, username } = useAuth();
  const { topic } = useParams();

  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener('resize', resizeWindow);
    if (windowWidth > 700) {
      setIsToggle(false);
    }
    return () => window.removeEventListener('resize', resizeWindow);
  }, [windowWidth]);

  useEffect(() => {
    getTopics()
      .then((data) => {
        setTopicsData(data.topics);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleToggle = () => {
    setIsToggle(!isToggle);
  };

  const handleActiveLink = (id) => {
    if (isActive === id) {
      setActivate(true);
    }
  };

  return (
    <>
      <div className='navbar-container'>
        <div className='navbar'>
          <div className='mobile-nav'>
            <div className='logo'>
              <Link
                to={`/Home`}
                onClick={() => {
                  setIsActive(false);
                }}
              >
                NCnews
              </Link>
            </div>
            <div className='mobile-icon' onClick={handleToggle}>
              <AiOutlineMenu />
            </div>
          </div>

          <div className={isToggle ? 'topics-nav' : 'topics-nav hide-nav'}>
            {
              <div className={!isActive ? 'active-link item' : 'item'}>
                <Link
                  to={`/Home`}
                  onClick={() => {
                    setIsToggle(false);
                    setIsActive(topic);
                  }}
                >
                  ALL
                </Link>
              </div>
            }
            {topicsData.map((topic) => {
              return (
                <div
                  className={
                    activate && topic.slug === isActive
                      ? 'active-link item'
                      : 'item'
                  }
                  key={topic.slug}
                >
                  <Link
                    to={`topics/${topic.slug}`}
                    alt={topic.slug}
                    onClick={() => {
                      setIsToggle(false);
                      setIsActive(topic.slug);
                      handleActiveLink(topic.slug);
                    }}
                  >
                    {topic.slug.toUpperCase()}
                  </Link>
                </div>
              );
            })}
          </div>
          <div className={isToggle ? 'login' : 'topics-nav hide-nav'}>
            {!authUser ? (
              <div className='login-link'>
                <Link to={`/login`}>Login</Link>
              </div>
            ) : (
              <div className='login-link'>
                <Link to={`/logout`}>
                  <img
                    className='nav-profile-picture'
                    src={require(`../images/profile-picture-${username}.png`)}
                    alt={username}
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
