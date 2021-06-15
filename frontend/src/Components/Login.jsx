import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, logInWithCartRequest } from '../Redux/actions'
import { isSignedIn as selector } from '../Redux/selectors'
import { Redirect } from 'react-router-dom'
import useStyles from './loginStyles'
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";





export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const shcema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    remember: yup.boolean(),
  })

  let [loginError, setLoginError] = React.useState(false);

  const { register, handleSubmit, formState:{errors}, watch } = useForm({ resolver: yupResolver(shcema) });
  const onSubmit = async data => {
    setLoginError(false);
    console.log(data);
    console.log(errors);
    console.log("submit")
    //data object tartalmazza az adatokat a login action végrahajtásához, azokat kell majd a disptch fv-be tenni, redux-thunk here we go
    const res = await fetch("http://localhost/api/Identity/login",{
      method : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: data.email, password:data.password})
    })
    const result = await res.json();
    console.log(result);
    if(!result.success){
      setLoginError(result.errorMsg)
    }
    if(result.success)
      dispatchLogin('Bearer '+result.token, data.email);
  }

  const dispatchLogin = (token, email) => {
    dispatch(logInWithCartRequest(token, email));
  }

  const isSignedIn = useSelector(selector);

  //could be useful for sign up, will see how
  if (isSignedIn) {
    return (
      <Redirect to="/" />
    )
  }

  const emailErrorText = (errors) ? (errors.email) ? (errors.email.type === 'required') ? 'This field must not be empty' : (errors.email.type === 'email') ? 'Please enter a valid email address!' : '' : '' : '';
  const passwordErrorText = (errors)? (errors.password)? 'This field must not be empty':'':'';

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>

        <Typography component="h1" variant="h5">
          Sign inn
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            //inputRef={register}
            error={!!errors.email}
            helperText={errors.email && emailErrorText}
            {...register('email')} 
          />
          <TextField
            variant="outlined"
            margin="normal"

            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password && passwordErrorText}
            //inputRef={register}
            {...register('password')}
          />
          
          {loginError&&(<div variant="subtitle2" style={{color:"red"}}>{loginError}</div>)}

          <Button
            type="submit"
            /* onClick={dispatchLogin} */
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}

          >
            Sign In
          </Button>
          <Grid container>
            
            <Grid item>
              <Link component={RouterLink} to='/signup' variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
        
      </div>
    </Container>
  );
}