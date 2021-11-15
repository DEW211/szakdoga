import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useSelector, useDispatch } from 'react-redux'
import { getCart } from '../Redux/selectors'
import { setCart, purgeCart } from '../Redux/actions'
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";



const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    //borderBottom: `1px solid ${theme.palette.divider}`,
  },
  main: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(18)
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(4)
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Shipping address', 'Payment details', 'Review your order'];




function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const cart = useSelector(getCart);
  const total = useSelector((store) => {
    let sum = 0;
    store.cart.cart.forEach((i) => {
      sum += i.price * i.amount
    })
    return sum;
  })
  const token = useSelector(store => {
    return store.login.token
  })
  const email = useSelector(store => {
    return store.login.email
  })
  const cartId = useSelector(store => store.cart.id)

  const shippingSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    address: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
    country: yup.string().required(),
  })

  const { register: shippingRegister, handleSubmit: shippingHandleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(shippingSchema) });

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setlastName] = React.useState('');
  const [city, setcity] = React.useState('');
  const [address, setaddress] = React.useState('');
  const [state, setstate] = React.useState('');
  const [zip, setzip] = React.useState('');
  const [country, setcountry] = React.useState('');
  const [error, setError] = React.useState(false)
  const [nameOnCard, setNameOnCard] = React.useState('');
  const [cardNumber, setCardNumber] = React.useState('');
  const [expDate, setExpDate] = React.useState('');
  const [cvv, setCvv] = React.useState('');

  const dispatch = useDispatch();


const handleNext = async () => {
  switch (activeStep) {
    case 0: {
      if (firstName === '' || lastName === '' || city === '' || address === '' || state === '' || zip === '' || country === '') {
        setError('This field must not be empty')
        return;
      }
      break;
    }
    case 1: {
      if (nameOnCard === '' || cardNumber === '' || expDate === '' || cvv === '') {
        setError('This field must not be empty')
        return;
      }
      break;
    }
    case 2:
      //make request to ordering, and get him a new empty cart
      await fetch("/api/Ordering", {
        method: 'POST',
        headers: {
          'email': email, //TOKEN
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          basketId: cartId,
          products: cart.map(p => { return { id: p.id, amount: p.amount } }),
          price: total
        })
      })
      let cartOnServer = await fetch("/api/Basket", {
                method: 'POST',
                headers: {
                    'email': email, //ide majd a token megy
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: 0,
                    cart: []
                })
            });
      cartOnServer = await cartOnServer.json();
      dispatch(setCart(cartOnServer))
      //dispatch(purgeCart)
      break;
    default: break;
  }
  setActiveStep(activeStep + 1);
  setError(false);
};

const handleBack = () => {
  setActiveStep(activeStep - 1);
};

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <AddressForm  error={error} setters={{ setFirstName, setlastName, setcity, setaddress, setstate, setzip, setcountry }} />;
    case 1:
      return <PaymentForm error={error} setters={{ setNameOnCard, setCardNumber, setExpDate, setCvv }} />;
    case 2:
      return <Review cart={cart} total={total} shipping={{ name: `${firstName} ${lastName}`, address: `${address}, ${city}, ${state}, ${zip}, ${country}` }} payment={{ holder: nameOnCard, number: `XXXX-XXXX-XXXX-${cardNumber.slice(-4)}`, expDate: expDate }} />;
    default:
      throw new Error('Unknown step');
  }
}

return (
  <React.Fragment>
    <Container component="main" className={classes.main} maxWidth="sm">
      <Paper className={classes.paper} variant="outlined">
        <Typography component="h1" variant="h4" align="center">
          Checkout
          </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
                </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <div className={classes.buttons}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}

                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      </Paper>
    </Container>
  </React.Fragment>
);
}

export default Checkout