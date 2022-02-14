import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import '../components/Login.css';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setisNavBarHidden }) => {
  const { changeUser, authenticateUser, username } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setisNavBarHidden(true);
  }, [setisNavBarHidden]);

  const handleLogout = () => {
    setisNavBarHidden(false);
    changeUser(username);
    authenticateUser(false);
    navigate(-1);
  };

  const handleGoback = () => {
    setisNavBarHidden(false);
    navigate(-1);
  };

  return (
    <div className='login-container'>
      <div className='profile-picture-container'>
        <img
          className='login-profile-picture'
          src={require(`../images/profile-picture-jessjelly.png`)}
          alt='jessjelly'
        />
      </div>
      <div>{username}</div>
      <div className='item-login'>
        <button className='logout-btn' onClick={handleLogout}>
          Logout
        </button>
      </div>
      <button className='go-back' onClick={handleGoback}>
        Go Back
      </button>
    </div>
  );
};

export default Logout;
