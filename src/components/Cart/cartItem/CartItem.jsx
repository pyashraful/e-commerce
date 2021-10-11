import React from 'react'
import {Card, Typography, CardMedia, CardContent, CardActions, Button} from '@material-ui/core'
import  useStyle from './styles'

const CartItem = ({ item, handleRemove, handleUpdateQuantity }) => {

  const classes = useStyle()
  
  return (
    <Card>
      <CardMedia image={item.media.source} alt={item.name} className={classes.media} />
      <CardContent className={classes.cardContent} >
        <Typography variant='h5' >{item.name}</Typography>
        <Typography variant='h5' >{item.line_total.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions classes={classes.CartActions}>
        <div className={classes.buttons}>
          <Button type='button' size='small' onClick={()=> handleUpdateQuantity(item.id, item.quantity -1)} >-</Button>
          <Typography>{item.quantity}</Typography>
          <Button type='button' size='small' onClick={()=> handleUpdateQuantity(item.id, item.quantity + 1)} >+</Button>
        </div>
        <Button variant='contained' type='button' color='secondary' onClick={() => handleRemove(item.id) } > remove</Button>
      </CardActions>
    </Card>
  )
}

export default CartItem;
