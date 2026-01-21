import React , {  useEffect , useState }from 'react';
import './App.css';
import {Trackings} from './interfaces/InitialData.interface'
import { BrowserRouter} from "react-router-dom"
import RoutesMode from './components/routes';

function App() {

  const [orders, setOrders] = useState<Trackings[]>([]);
  const [theme, setTheme] = useState('light');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const currentTheme = localStorage.getItem("theme")
  const isToggleChecked = localStorage.getItem("isChecked")

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.log(err));
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') { 
      setTheme('light');
      setIsChecked(false)
      localStorage.setItem('isChecked', `${isChecked}`)
    } else {
      setTheme('dark');
      setIsChecked(true)
      localStorage.setItem('isChecked', `${isChecked}`)
    }
    // localStorage.setItem('isChecked', `${isChecked}`)
    localStorage.setItem('theme', theme)
 
  };

  useEffect(() => {
    document.body.className = currentTheme || theme;
  }, [theme, currentTheme]);


  return (
    <div id="app" className={`${currentTheme}`}>
      <div className='container'>
        <div className='btn-theme'>
          <div className='toggle-switch'>
              <input 
                type="checkbox" 
                onChange={toggleTheme}
                checked={isToggleChecked === "true" ? true : false}
                id="darkmode-toggle"/>
              <label htmlFor="darkmode-toggle"/>
          </div>
        </div>
        <BrowserRouter>
            <RoutesMode data={orders}/>
        </BrowserRouter>
      </div>
     </div>
  );
}

export default App;
