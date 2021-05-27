import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Switch, Route, Redirect,} from "react-router-dom";

import Drawer from '@material-ui/core/Drawer';
// import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Meun from './Meun';
import AllEchart from '../pages/AllEchart';
import Allproducts from '../pages/Allproducts';
import AddGoods from '../pages/AddGoods';
import Footer from '../pages/Footer/Footer';
import routes from "./routes";



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },

    content: {
        flexGrow: 1,
    },
    footer:{
        position:'absolute',
        width:'85%',
        bottom:0,
        left:'280px',
    },

}));



export default function ClippedDrawer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline/>

            <Drawer className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper}}>

                <Meun/>
            </Drawer>
            <main className={classes.content}>
                <Typography paragraph>
                    <AllEchart/>
                    {/*<Allproducts/>*/}
                    {/*<AddGoods/>*/}
                </Typography>
            </main>
            <div className={classes.footer}
            style={{display:'block'}}
            >
                <Footer />
            </div>
        </div>
    );
}
