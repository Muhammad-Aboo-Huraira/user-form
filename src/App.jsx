import { BrowserRouter } from "react-router-dom";
import './App.css'
import RoutesIndex from "./Routes/RoutesIndex";
import '@fontsource/noto-sans';
import '@fontsource/noto-sans/700.css';


function App() {

  return (
    <>
    <BrowserRouter>
      <RoutesIndex />
    </BrowserRouter>
    </>
  )
}

export default App
