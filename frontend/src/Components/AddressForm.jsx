import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { ErrorOutlineRounded } from '@material-ui/icons';

export default function AddressForm(props) {
  const helperText= 'This field must not be empty';

  const [text, setText] = React.useState('');
  const setters = props.setters;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            error={props.error}
            helperText={props.error && props.error}
            onChange={e => props.setters.setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={e => props.setters.setlastName(e.target.value)}
            error={props.error}
            helperText={props.error && props.error}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={e => props.setters.setaddress(e.target.value)}
            error={props.error}
            helperText={props.error && props.error}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={e => props.setters.setcity(e.target.value)}
            error={props.error}
            helperText={props.error && props.error}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            onChange={e => props.setters.setstate(e.target.value)}
            error={props.error}
            helperText={props.error && props.error}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            onChange={e => props.setters.setzip(e.target.value)}
            error={props.error}
            helperText={props.error && props.error}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"            
            onChange={e => props.setters.setcountry(e.target.value)}
            error={props.error}
            helperText={props.error && props.error}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}