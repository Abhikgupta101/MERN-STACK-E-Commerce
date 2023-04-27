import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, setCount } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function Orders({ order }) {
    var totalCart = 0;
    const userid = localStorage.getItem('userId')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <React.Fragment>
                    <Typography variant="h6" gutterBottom>
                        Order Id: {order.order_id}
                    </Typography>
                    <List disablePadding>
                        {order.products.map((product) => (
                            <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                                <ListItemText primary={product.name} />
                                <Typography variant="body2">{product.qty} x ${product.price}</Typography>
                            </ListItem>
                        ))}

                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary="Total" />
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                ${order.total_order}
                            </Typography>
                        </ListItem>
                    </List>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                Shipping
                            </Typography>
                            <Typography gutterBottom>{order.address[0].fname} {order.address[0].lname}</Typography>
                            <Typography gutterBottom>
                                {order.address[0].address},
                                {order.address[0].city},
                                {order.address[0].state},
                                {order.address[0].zip},
                                {order.address[0].country}
                            </Typography>
                        </Grid>
                        <Grid item container direction="column" xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                Payment details
                            </Typography>
                            <Grid container>
                                {order.payment.map((item) => (
                                    <React.Fragment key={item.name}>
                                        <Grid item xs={6}>
                                            <Typography gutterBottom>{item.name}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography gutterBottom>{item.detail}</Typography>
                                        </Grid>
                                    </React.Fragment>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </React.Fragment>
            </Paper>
        </Container>
    );
}