import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './views/Home';
import Article from './views/Article';
import Comments from './views/Comments';
import Login from './components/Login';
import Logout from './components/Logout';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Error from './components/Error';

function App() {
  const [isNavBarHidden, setisNavBarHidden] = useState(false);
  return (
    <div className='App'>
      <BrowserRouter>
        <ScrollToTop />
        {isNavBarHidden ? null : <Navbar />}

        <Routes>
          <Route
            path='/login'
            element={<Login setisNavBarHidden={setisNavBarHidden} />}
          />
          <Route
            path='/logout'
            element={<Logout setisNavBarHidden={setisNavBarHidden} />}
          />
          <Route
            path='*'
            element={
              <Error pathNotFound={[400, 'Oops! That Path can’t be found.']} />
            }
          />
          <Route path='/home' element={<Home />} />
          <Route path='/topics' element={<Home />} />
          <Route path='/topics/:topic/' element={<Home />} />
          <Route path='/articles/:article_id/' element={<Article />} />
          <Route path='/articles/:article_id/comments' element={<Comments />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
