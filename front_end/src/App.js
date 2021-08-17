import './App.css';
import { Route, Switch } from 'react-router-dom';
import About from './About';
import Cart from './Cart';
import Home from './Home';
import Header from './Header';
import Contact from './Contact.js';
import LoginPage from './LoginPage.js';
import SignupPage from './SignupPage';


function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route exact path={["/","/home"]} component={Home}/>
        <Route exact path="/cart" component={Cart}/>
        <Route path="/about" component={About}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/signup" component={SignupPage}/>
      </Switch>
    </div>
  );
}

export default App;