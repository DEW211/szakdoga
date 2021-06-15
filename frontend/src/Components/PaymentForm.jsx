import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


export default function PaymentForm(props) {
  return (
    <form>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            error={props.error}
            helperText={props.error && props.error}
            onChange={e => props.setters.setNameOnCard(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            error={props.error}
            helperText={props.error && props.error}
            onChange={e => props.setters.setCardNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            error={props.error}
            helperText={props.error && props.error}
            onChange={e => props.setters.setExpDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText={(props.error)?props.error:"Last three digits on signature strip"}
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            error={props.error}
            helperText={props.error && props.error}
            onChange={e => props.setters.setCvv(e.target.value)}
          />
        </Grid>
        
      </Grid>
    </form>
  );
}