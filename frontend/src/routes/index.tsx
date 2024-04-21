import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Account from '../components/account/Account';
import Signin from '../components/account/Signin';
import Signup from '../components/account/Signup';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />}>
          <Route path="sign-in" element={<Signin />} />
          <Route path="sign-up" element={<Signup />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
