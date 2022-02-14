import '../components/Error.css';
import { Link } from 'react-router-dom';

const Error = ({ errorData, errorStatusData, pathNotFound }) => {
  return (
    <div className='error'>
      {errorData && (
        <>
          <h1>{errorStatusData}</h1>
          <h2>{errorData}</h2>
        </>
      )}
      {pathNotFound && (
        <>
          <h1> {pathNotFound[0]}</h1>
          <h2> {pathNotFound[1]}</h2>
        </>
      )}

      <span className='return-homepage'>
        <Link to={`/Home`}>Link to Homepage</Link>
      </span>
    </div>
  );
};

export default Error;
