import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];

const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {
  const classes = useStyles();

  const cart = props.cart;

  

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={`Quantity: ${product.amount}`} />
            <Typography variant="body2">{product.price*product.amount}</Typography>
          </ListItem>
        ))}

        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {props.total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{props.shipping.name}</Typography>
          <Typography gutterBottom>{props.address}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
              <React.Fragment>
                <Grid item xs={6}>
                  <Typography gutterBottom>Card Holder</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{props.payment.holder}</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment>
                <Grid item xs={6}>
                  <Typography gutterBottom>Card number</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{props.payment.number}</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment>
                <Grid item xs={6}>
                  <Typography gutterBottom>Expiry date</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{props.payment.expDate}</Typography>
                </Grid>
              </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}