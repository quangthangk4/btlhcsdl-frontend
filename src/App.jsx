import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import AddAccount from './pages/AddAccount';
import Home from './pages/Home';
import Login from './pages/Login';
import Account from './pages/Account'

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Account" element={ <Account/> } />
          <Route path="/addaccount" element={ <AddAccount />} />
          <Route path="/login" element={ <Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
