import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import ControlComponent from './components/ControlComponent';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomeComponent />}></Route>
        <Route path='/control/*' element={<ControlComponent />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
