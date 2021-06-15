import { Container, Typography, Button, Grid } from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import useStyles from './cartStyles';
import {getCart} from '../Redux/selectors'
import {emptyCart as empty} from '../Redux/actions'
import CartItem from './CartItem'


const Cart = () => {
    const classes = useStyles();
  
    const cart = useSelector(getCart);
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(store => {
      return store.login.login;
    })

    const total = useSelector((store) => {
      let sum = 0;
      store.cart.cart.forEach((i)=>{
        sum += i.price * i.amount
      })
      return sum;
    })

    const renderEmptyCart = () => (
      <Typography variant="subtitle1">You have no items in your shopping cart,&nbsp;
        <Link className={classes.link} to="/">start adding some</Link>!
      </Typography>
    );
  
    const emptyCart = () => {
      dispatch(empty())
    }
  
    const renderCart = () => (
      <>
        <Grid container spacing={3}>
          {cart.map((lineItem) => (
            <Grid item xs={12} sm={4} key={lineItem.id}>
              <CartItem item={lineItem}/>
            </Grid>
          ))}
        </Grid>
        <div className={classes.cardDetails}>
          <Typography variant="h4">Total: {total}</Typography>
          <div>
            <Button className={classes.emptyButton} onClick={emptyCart} size="large" type="button" variant="contained" color="secondary" >Empty cart</Button>
            <Button className={classes.checkoutButton} component={Link} to="/checkout" size="large" type="button" variant="contained" color="primary" disabled={!isLoggedIn}>Checkout</Button>
            {!isLoggedIn && <Typography>Please sign in to checkout!</Typography>}
          </div>
        </div>
      </>
    );
  
    return (
      <Container>
        <div className={classes.toolbar} />
        <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
        { !cart.length ? renderEmptyCart() : renderCart() }
      </Container>
    );
  };
  
  export default Cart;
  