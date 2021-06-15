import {Card, CardMedia, CardContent, CardActions, Typography, IconButton, Link} from '@material-ui/core';
import {AddShoppingCart} from '@material-ui/icons';
import useStyles from './productStyles'
import { connect, useDispatch } from 'react-redux'
import {Redirect, useParams} from 'react-router-dom'
import {addToCart, addToCartWithRequest, } from '../Redux/actions'
import {Link as RouterLink} from 'react-router-dom'
import { useEffect } from "react";

const Product = ({product}) => {

    const classes = useStyles();

    const dispatch = useDispatch();

    const {id} = useParams();

    const addToCart = () => {
        dispatch(addToCartWithRequest(product))
    }

    

    return (
        <Card /* onClick={()=>{console.log("card clicked")}} */ /*component={Link}*//*  to="/products/1" */  className={classes.root}>
            <CardMedia component={RouterLink} to={`/product/${product.id}`} className={classes.media} image={product.image} title={product.name} height={0} paddingTop='56.25%'/>
            <CardContent>
                <div className={classes.cardContent} /* onClick={redirect} */>
                    <Link component={RouterLink} to={`/product/${product.id}`} gutterBottom variant="h5" color="inherit">
                        {product.name}
                    </Link>
                    <Typography gutterBottom variant="h5" component="h2">
                        {product.price}
                    </Typography>
                </div>
                <CardActions disableSpacing className={classes.cardActions}>
                    <IconButton onClick={addToCart}>
                        <AddShoppingCart/>
                    </IconButton>
                </CardActions>
            </CardContent>
        </Card>
    )
};

export default Product