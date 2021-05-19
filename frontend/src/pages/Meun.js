import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Dashboard from '@material-ui/icons/Dashboard';
import SvgIcon from '@material-ui/core/SvgIcon';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawerContainer: {
        overflow: 'auto',
    },
}));


function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </SvgIcon>
    );
}

export default function ClippedDrawer() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
                <div className={classes.drawerContainer}>
                    <List>
                        {['首页', '全部商品', '全部规格', '添加商品', '添加规格', '管理员管理'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 10 === 0 ? <HomeIcon/> : <Dashboard/>}</ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))}
                    </List>
                </div>
        </div>
    );
}
