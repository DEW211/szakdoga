import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux'
import useStyles from './cartItemSyles';
import {sub, add, removeItemFromCart, subWithRequest, addWithRequest, removeItemFromCartWithRequest} from '../Redux/actions'
import {getCart} from '../Redux/selectors'
import _ from 'lodash'

const CartItem = ({ item }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const cart = useSelector(getCart);


  const amount = useSelector((state) => {
    let itemInStore  = _.find(state.cart.cart, (i) => i.id === item.id)
    return itemInStore.amount;
  })

  const total = useSelector((state) => {
    let itemInStore  = _.find(state.cart.cart, (i) => i.id === item.id)
    return itemInStore.amount * itemInStore.price;
  })

  const removeItem = () => {
    dispatch(removeItemFromCartWithRequest(item));
  }


  const dec = () => {
    dispatch(subWithRequest(item))
  }

  const inc = () => {
    dispatch(addWithRequest(item))
  }

  return (
    <Card className="cart-item">
      <CardMedia image={item.image} alt={item.name} className={classes.media} />
      <CardContent className={classes.content}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">{total}</Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <div className={classes.buttons}>
          <Button type="button" onClick={dec} size="small" disabled={amount <= 0} >-</Button>
          <Typography>&nbsp;{amount}&nbsp;</Typography>
          <Button type="button" onClick={inc} size="small">+</Button>
        </div>
        <Button variant="contained" onClick={removeItem} type="button" color="secondary" >Remove</Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
