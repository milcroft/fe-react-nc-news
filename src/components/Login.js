import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import '../components/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setisNavBarHidden }) => {
  const { changeUser, authenticateUser, authUser, username } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setisNavBarHidden(true);
  }, [setisNavBarHidden]);

  const handleLogin = () => {
    setisNavBarHidden(false);
    changeUser(username);
    authenticateUser(true);

    navigate(-1);
  };

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
      <form className='login-form'>
        <div className='item-login'>
          <input placeholder='jessjelly' className='login_username' disabled />
        </div>

        <div className='item-login'>
          <input placeholder='********' className='login_password' disabled />
        </div>
      </form>

      {!authUser ? (
        <div className='item-login'>
          <button className='login-btn' onClick={handleLogin}>
            Login
          </button>
        </div>
      ) : (
        <div className='item-login'>
          <button className='login-btn' onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      <button className='go-back' onClick={handleGoback}>

        Go Back
      </button>
    </div>
  );
};

export default Login;
