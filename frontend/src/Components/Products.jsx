import React from 'react';
import {useEffect, useState} from 'react'
import {Grid} from '@material-ui/core';
import Product from './Product';
import useStyles from './productsStyles';

const Products = () => {
    const classes = useStyles();

    //let products = [{ id: 1, name:'Kettle', price: 10},{ id: 2, name:'Bag', price: 12}]

    let [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await (await fetch("http://localhost/api/Catalog")).json();
            console.log(result);
            let formated = result.map((p, i) => {
                return {
                    id:p.id,
                    name:p.name,
                    price:p.price,
                    image:p.imageUrl
                }
            });
            console.log(formated);
            setProducts(formated);
        }
        fetchData();
    }, [])


    return (
        <main className={classes.content}>
            <div className={classes.toolbar}></div>
            <Grid container justify="center" spacing={4}>
             {products.map((product, i) => (
                 <Grid key={i} item  xs={12} sm={6} md={4} lg={3}>
                    <Product product={product}/>
                 </Grid>
             ))}
             </Grid>
        </main>
        
    )
}

export default Products;
