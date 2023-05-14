import Routers from './components/routes';
import './App.css'
import {  MyContextProvider } from './context/context';

function App() {

  return (
    <MyContextProvider>
      <Routers />
    </MyContextProvider>
  )
}

export default App