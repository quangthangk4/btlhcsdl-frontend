import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import AddAccount from './pages/AddAccount';
import Home from './pages/Home';
import Login from './pages/Login';
import Account from './pages/Account'
import './app.scss'
import Report from './pages/Report';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return (
    <Router>
      <div className="marginTop-50px">
        <Header isLoggedIn={isLoggedIn} />
        <Routes>

          {!isLoggedIn && (
            <>
              <Route path="/login" element={<Login />} />
            </>
          )}

          <Route path="/" element={<Home />} />

          {/* protectedRoute */}
          <Route element={<ProtectedRoute />}>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/account" element={<Account />} />
            <Route path="/addaccount" element={<AddAccount />} />
            <Route path="/report" element={<Report />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
