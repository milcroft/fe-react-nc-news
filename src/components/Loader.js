import { FaSpinner } from 'react-icons/fa';
import '../components/Loader.css';

const Loading = () => {
  return (
    <div className='spinnerContainer'>
      <FaSpinner className='spins' />
    </div>
  );
};

export default Loading;
