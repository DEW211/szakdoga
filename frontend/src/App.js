import { CssBaseline } from '@material-ui/core'
import Navbar from './Components/Navbar';
import Products from './Components/Products'
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom'
import Cart from './Components/Cart';
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import ProductDetails from './Components/ProductDetails'
import RouterComp from './Components/RouterComp';
import Checkout from './Components/Checkout';

function App() {


  return (
    <Router>
      <div>
        <CssBaseline />
        <Switch>
          <Route exact path="/">
            <Navbar />
            <Products />
          </Route>
          <Route exact path="/cart">
            <Navbar />
            <Cart />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/product/:id">
            <Navbar/>
            <ProductDetails/>
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route path="/:id/:id2">
            <RouterComp/>
          </Route>
          <Route path="/checkout">
            <Navbar/>
            <Checkout/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
