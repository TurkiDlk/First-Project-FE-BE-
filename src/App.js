
import { Outlet } from 'react-router-dom';
import './App.css';
import Counter from './Counter';

function App() {
  return (
    <div className="App" style={{marginTop:"130px" }}>
       <Outlet />
       
    
    </div>
  );
}

export default App;
