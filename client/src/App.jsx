import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import AdminPage from './pages/AdminPage';
import Home from './pages/Home';
import Program from './pages/Program';
import AdminSignIn from './pages/AdminSignIn';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/program" element={<Program />} />
        <Route path="/admin" element={<AdminSignIn />} />
        <Route element={<PrivateRoute />}>
            <Route path="/adminPage" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
