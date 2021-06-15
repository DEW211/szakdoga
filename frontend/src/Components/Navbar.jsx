import { AppBar, Toolbar, Typography, IconButton, Badge, Button } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import useStyles from './navbarStyles';
import { useSelector, useDispatch } from 'react-redux'
import { getNumberOfItemsInCart } from '../Redux/selectors'
import { Link, useLocation } from 'react-router-dom'
import {logout, purgeCart} from '../Redux/actions'

const Navbar = () => {

    let classes = useStyles();
    const location = useLocation();
    const dispatch = useDispatch();

    const numberOfItems = useSelector(getNumberOfItemsInCart);
    const isLoggedIn = useSelector((store) => {
        return store.login.login
    })

    const onSignOut = () => {
        dispatch(logout())
        dispatch(purgeCart())
    }

   

    return (
        <AppBar position='fixed' className={classes.appBar} color='inherit'>
            <Toolbar>
                <Typography component={Link} to="/" className={classes.title} color="inherit">
                    Webshop
                </Typography>
                <div className={classes.grow} />
                {isLoggedIn && (<Typography>Hello customer!</Typography>)}
                {(isLoggedIn) ?
                    (<Button className={classes.login} onClick={onSignOut} variant="outlined">Sign out</Button>) :
                    <Button className={classes.login} component={Link} to="login" variant="outlined">Sign in</Button>
                }
                {(
                    <div className={classes.button}>

                        <IconButton component={Link} to="../cart" color="inherit">
                            <Badge color="secondary" badgeContent={numberOfItems}>
                                <ShoppingCart />
                            </Badge>
                        </IconButton>

                    </div>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;