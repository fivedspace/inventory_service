import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Switch, Route, Redirect,} from "react-router-dom";

import Drawer from '@material-ui/core/Drawer';
// import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// import AllEchart from '../pages/AllEchart';
import Meun from './Meun';
import Allproducts from '../pages/Allproducts';
// import AddGoods from '../pages/AddGoods';
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

}));

const switchRoutes = (
    <Switch>
        {routes.map((prop, key) => {
            if (prop.layout === "/admin") {
                return (
                    <Route
                        // history={}
                        // path={prop.layout + prop.path + "/:token"}
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            }
            return null;
        })}

        {/* ===========================================  */}

        {/*<Redirect from="/admin/find_app" to="/admin/addProfile"/>*/}
        {/*<Redirect from="/admin/find_merchant" to="/admin/merchant"/>*/}
        {/*<Route path="/addProfile" component={AppProfile} exact/>*/}
        {/*<Route path="/merchant" component={Merchant} exact/>*/}
    </Switch>
);


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
                    {/*{switchRoutes}*/}
                    {/*<AllEchart/>*/}
                    <Allproducts/>
                    {/*<AddGoods/>*/}
                </Typography>
            </main>
        </div>
    );
}
