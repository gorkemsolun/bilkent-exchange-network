import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home  from './app/home/home.tsx';
import './App.css';



function App() {
    
   

    return (
        <div>a
         <BrowserRouter>
                    <Link
                        to="/home"
                    >
                        Login
                    </Link>
                <Routes>
                    <Route path="home" element={<Home>
                            </Home> }>
                            
                        </Route>
                    </Routes>
                </BrowserRouter>
        </div>
               
                
                
    );

   
}

export default App;