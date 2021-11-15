import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link as RouterLink } from 'react-router-dom'
import useStyles from './signupStyles';
import { appendErrors, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { login, logInWithCartRequest } from '../Redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { isSignedIn as selector } from '../Redux/selectors'






export default function SignUp() {
  const classes = useStyles();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
  })

  const [signUpError, setSignUpError] = React.useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
  const dispatch = useDispatch();


  const onSubmit = async (data) => {
    //dispatch signup action, not yet implemented
    setSignUpError(false)
    try {
      const res = await fetch("/api/Identity/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: data.email, password: data.password })
      })
      const result = await res.json();
    } catch (e) {
      setSignUpError("Account already exists")
    }
    if (!signUpError) {
      const res = await fetch("/api/Identity/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: data.email, password: data.password })
      })
      const result = await res.json();
     
      if (result.success)
        dispatchLogin('Bearer '+result.token, data.email);
    }
  }

  const dispatchLogin = (token, email) => {
    dispatch(logInWithCartRequest(token, email));
  }

  const fieldIsRequiredMsg = 'This filed must not be empty';
  const emailErrorMsg = (errors.email) ? (errors.email.type === 'required') ? fieldIsRequiredMsg : (errors.email.type === 'email') ? 'Please enter a valid email address!' : '' : '';

  const isSignedIn = useSelector(selector);

  //could be useful for sign up, will see how
  if (isSignedIn) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                helperText={errors.email && emailErrorMsg}
                error={errors.email}
                fullWidth
                id="email"
                label="Email Address*"
                name="email"
                //inputRef={register}
                autoComplete="email"
                {...register("email")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                helperText={errors.password && fieldIsRequiredMsg}
                error={errors.password}
                fullWidth
                name="password"
                label="Password*"
                type="password"
                id="password"
                //inputRef={register}
                autoComplete="current-password"
                {...register("password")}
              />
            </Grid>
          </Grid>
          {signUpError && (<div variant="subtitle2" style={{ color: "red" }}>{signUpError}</div>)}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to="login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}