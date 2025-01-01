import { Routes, Route } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import ControlComponent from './components/ControlComponent';
import NotFound from './components/NotFound';
import HeaderComponent from './components/Layout/HeaderComponent';
import FooterComponent from './components/Layout/FooterComponent';

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <Routes>
        <Route path='/' element={<HomeComponent />}></Route>
        <Route path='/control/*' element={<ControlComponent />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;
