import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// import AllEchart from '../components/AllEchart';
import Meun from './Menu';
import Allproducts from '../components/Allproducts'

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
                        {/*<AllEchart/>*/}
                    <Allproducts/>
                </Typography>
            </main>
        </div>
    );
}
