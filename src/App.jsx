import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import AddAccount from './pages/AddAccount';
import Home from './pages/Home';
import ListAccount from './pages/ListAccount';
import Login from './pages/Login';
import Search from './pages/Search';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={ <Search/> } />
          <Route path="/addaccount" element={ <AddAccount />} />
          <Route path="/listaccount" element={ <ListAccount /> } />
          <Route path="/login" element={ <Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
