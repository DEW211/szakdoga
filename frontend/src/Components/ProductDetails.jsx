import React, { useEffect, useState } from "react";
import { makeStyles, Grid, Card, CardMedia, CardActions, Typography, IconButton, CardContent, Box, GridList, GridListTile, GridListTileBar, Hidden, withWidth } from '@material-ui/core'
import { AddShoppingCart, StarBorder as StarBorderIcon } from '@material-ui/icons'
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import _ from 'lodash';
import { connect, useDispatch } from 'react-redux'



const ProducDetails = (props) => {

     const tileData = [
        {

            imgLarge: "https://via.placeholder.com/600?text=1",
            imgSmall: "https://via.placeholder.com/130?text=1",
            title: "Image",
            author: 'author'
        },
        {
            imgLarge: "https://via.placeholder.com/600?text=2",
            imgSmall: "https://via.placeholder.com/130?text=2",
            title: "Image",
            author: 'author'
        },
        {
            imgLarge: "https://via.placeholder.com/600?text=3",
            imgSmall: "https://via.placeholder.com/130?text=3",
            title: "Image",
            author: 'author'
        },
        {
            imgLarge: "https://via.placeholder.com/600?text=4",
            imgSmall: "https://via.placeholder.com/130?text=4",
            title: "Image",
            author: 'author'
        },
        {
            imgLarge: "https://via.placeholder.com/600?text=5",
            imgSmall: "https://via.placeholder.com/130?text=5",
            title: "Image",
            author: 'author'
        },
        {
            imgLarge: "https://via.placeholder.com/600?text=6",
            imgSmall: "https://via.placeholder.com/130?text=6",
            title: "Image",
            author: 'author'
        },
        {
            imgLarge: "https://via.placeholder.com/600?text=7",
            imgSmall: "https://via.placeholder.com/130?text=7",
            title: "Image",
            author: 'author'
        },
        {
            imgLarge: "https://via.placeholder.com/600?text=8",
            imgSmall: "https://via.placeholder.com/130?text=8",
            title: "Image",
            author: 'author'
        },
    ] 

    const [lgImg, setLgImg] = useState(0)

    const [product, setProduct] = useState(0)

    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch({type:'ADD_TO_CART', payload:{id: product.id, name:product.name, image: product.imageUrl, price: product.price}})
    }

    const classes = makeStyles((theme) => ({
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
        },

        cardRoot: {
            maxWidth: '100%'
        },
        media: {
            height: 0,
            paddingTop: '56.25%'
        },
        cardActions: {
            //display: 'flex',
            //justifyContent: 'flex-end',
        },
        cardContent: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
            width: '100%'

        },
        gridList: {
            flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
        },
        cardContent2: {
            padding: 0,
            paddingTop: 4,

        },
        cardDescRoot: {
            marginTop: 12,
            maxWidth: '100%'
        },
        cardDescContent: {
            //padding: 4,
            padding: theme.spacing(4)
        }
    }))();

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const result = await (await fetch(`http://localhost/api/Catalog/${id}`)).json();
            console.log(result);
            setProduct(result)
        }

        fetchData();
        //setProduct({data:"data"});
    }, [])

    //const { width } = props;

    //let products = [{ id: 1, name: 'Kettle', price: 10 }, { id: 2, name: 'Bag', price: 12 }] //ez lesz majd egy useEffectben

   
    //const product = _.find(products, (item) => item.id === parseInt(id));


    return (
        <main className={classes.content}>
            
            <div className={classes.toolbar}></div>
            <div>DetailsPage</div>
            {product &&
            <Grid container justify="center" spacing={4}>
                <Grid item xs={12} lg={6}>
                    <Card className={classes.cardRoot}>
                        {/*card teteje, ha md, lg, xl */}
                        <Hidden only={['xs', 'sm']}>
                            <CardMedia className={classes.media} image={product.images[lgImg].imgLarge} title="title" />
                        </Hidden>
                        {/*card teteje, ha xs, sm !!!választó*/}
                        <Hidden only={['md', 'lg', 'xl']} >
                            <div className={classes.root}>
                                <GridList className={classes.gridList} cols={6} cellHeight="auto">
                                    {tileData.map((tile) => (
                                        <GridListTile key={tile.img} cols={6}>
                                            <img src={tile.imgSmall} alt={tile.title} />
                                        </GridListTile>
                                    ))}
                                </GridList>
                            </div>
                        </Hidden>
                        <CardContent className={classes.cardContent2}>
                            {/*választó ha md, lg, xl*/}
                            <Hidden smDown>
                                <div className={classes.root}>
                                    <GridList className={classes.gridList} cols={6} cellHeight={150}>
                                        {product.images.map((tile, index) => (
                                            <GridListTile key={tile.img} cols={1}>
                                                <img src={tile.imgSmall} alt={tile.title} onClick={() => setLgImg(index)} />
                                            </GridListTile>
                                        ))}
                                    </GridList>
                                </div>
                            </Hidden>
                            <div className={classes.cardContent}>
                                <Typography flexGrow={1} variant="h5" component="h2">
                                    {product.name}
                                </Typography>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {product.price}
                                    </Typography>
                                    <CardActions className={classes.cardActions}>
                                        <IconButton >
                                            <AddShoppingCart onClick={addToCart} />
                                        </IconButton>
                                    </CardActions>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    {/* <Card className={classes.cardDescRoot}>
                        <CardContent className={classes.cardDescContent}>
                            Card content
                        </CardContent>
                    </Card> */}
                </Grid>
            </Grid>
}
        </main>
    )
}



export default ProducDetails