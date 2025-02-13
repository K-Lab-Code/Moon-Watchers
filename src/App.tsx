import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './index.css';


function App() {
  return (
    <nav className="bg-gradient-to-r from-gray-800 via-indigo-900 to-gray-800"> 

    <div className=''>
       <Navbar />  {/* Use the imported Navbar here */}
       <Outlet />  {/* Use the imported Outlet here */}
      <h1 className=""></h1>
    </div>
    </nav>
  );
}

export default App;


  
