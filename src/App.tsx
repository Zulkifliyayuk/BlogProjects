import { Home } from './pages/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FormSignUp } from './pages/FormSignUp/FormSignUp';
import { NotFound } from './pages/NotFound/NotFound';
import { FormLogin } from './pages/FormLogIn/FormLogIn';
import { Search } from './pages/Search/Search';
import { BlogDetails } from './pages/BlogDetails/BlogDetails';
import { useAuthInterceptor } from './services/hooks/useAuthInterceptor';
import { MyProfile } from './pages/MyProfile/MyProfile';
import { UsersProfile } from './pages/UsersProfile/UsersProfile';
import { WritePost } from './pages/WritePost/WritePost';
import { EditPost } from './pages/EditPost/EditPost';

function App() {
  useAuthInterceptor();

  return (
    <Router>
      <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path='/UsersProfile' element={<UsersProfile />} />
        <Route path='/MyProfile' element={<MyProfile />} />
        <Route path='/EditPost' element={<EditPost />} />
        <Route path='/Search' element={<Search />} />
        <Route path='/BlogDetails' element={<BlogDetails />} />
        <Route path='/Login' element={<FormLogin />} />
        <Route path='/SignUp' element={<FormSignUp />} />
        <Route path='/WritePost' element={<WritePost />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
