import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Customer from './pages/Customer';
import Banker from './pages/Banker';
import '../src/styles.css'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/customer" element = {<Customer/>}/>
          <Route path='/banker' element = {<Banker/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
