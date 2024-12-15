import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import ControlComponent from './components/ControlComponent';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomeComponent />}></Route>
        <Route path='/control/*' element={<ControlComponent />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
