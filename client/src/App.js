import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import { Detail, DogCreate, Home, Landing } from "./views"
import { Route } from "react-router-dom"
import { NavBar } from './components/NavBar/NavBar';


function App() {
  const location = useLocation()
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/dogs/:id" component={Detail} />
      <Route exact path="/create" component={DogCreate} />


      <h1>    </h1>
    </div>
  );
}

export default App;
