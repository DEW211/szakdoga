import React from 'react';
import {useEffect, useState} from 'react'
import {Grid, Box, Button} from '@material-ui/core';
import Product from './Product';
import useStyles from './productsStyles';

const Products = () => {
    const classes = useStyles();

    //let products = [{ id: 1, name:'Kettle', price: 10},{ id: 2, name:'Bag', price: 12}]

    let [products, setProducts] = useState([]);
    let [page, setPage] = useState(1);
    const itemsOnPage = 8;
    let [productCount, setProductCount] = useState(undefined)

    const fetchData = async (page) => {
        const fetchRes = await fetch(`/api/Catalog?page=${page}`)
        const result = await fetchRes.json();
        let formated = result.products.map((p, i) => {
            return {
                id:p.id,
                name:p.name,
                price:p.price,
                image:p.imageUrl
            }
        });
        setProductCount(result.count)
        setProducts(formated);
    }

    const onBack = async ()=>{
        setPage(page-1)
        await fetchData(page - 1)
    }
    const onForward = async () =>{
        setPage(page+1)
        await fetchData(page+1)
    }

    useEffect(() => {
        
        fetchData(1);
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
             <Grid container justify="center" className={classes.pager}>
                 {(page !== 1) && (<Button onClick={onBack} variant="outlined">{('<')}</Button>)}
                 <Button>{page}</Button>
                 {((itemsOnPage * page) < productCount) && (<Button onClick={onForward} variant="outlined">{('>')}</Button>)}
            </Grid>
        </main>
        
    )
}

export default Products;
