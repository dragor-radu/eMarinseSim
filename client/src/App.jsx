import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Program from './pages/Program';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/program" element={<Program />} />
      </Routes>
    </BrowserRouter>
  )
}
