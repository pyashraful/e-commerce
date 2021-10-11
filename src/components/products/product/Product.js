import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './styles';

const Product = ({product, onAddToCart})=> {

  const classes = useStyles();
  // console.log(product);
  return(
    <Card className={classes.root}>
      <CardMedia className={classes.media} image = {product.media.source} title={product.name} />
      {/* {console.log(product.media.source)} */}
      <CardContent>
        <Typography variant='h5' gutterBottom>
          {product.name}
        </Typography>
        <Typography variant='h5' >
          {product.price.formatted_with_symbol}
        </Typography>
        <Typography variant='body2' dangerouslySetInnerHTML={{ __html: product.description }} color='textSecondary' component='p' />
        <CardActions disableSpacing className={classes.cardActions}>
          <IconButton aria-label='Add to Card' onClick={() => onAddToCart(product.id, 1 )}>
            <AddShoppingCart />
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  )

}


export default Product;