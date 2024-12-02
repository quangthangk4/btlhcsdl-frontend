import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import AddAccount from './pages/AddAccount';
import Home from './pages/Home';
import Login from './pages/Login';
import Account from './pages/Account'
import './app.scss'
import Report from './pages/Report';

function App() {
  return (
    <div className="marginTop-50px">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={ <Account/> } />
          <Route path="/addaccount" element={ <AddAccount />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/report" element={ <Report />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
