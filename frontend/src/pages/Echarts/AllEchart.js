import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Echarts from './echarts.js';
import Echart from './echart.js';
import config from "../../config/config.json";
import index from "../Admin";
import axios from "axios";


// const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },

}));


export default function ClippedDrawer() {
    const classes = useStyles();


    return (
        <div>

            <div className={classes.root} style={{marginTop:'-60px'}}>

            <main className={classes.content}>

                <Typography paragraph>
                    <h2 style={{textAlign:'center',backgroundColor:'darkgray',color:'white'}}>  库存统计图</h2>
                    <div style={{display:'flex',boxSizing:'border-box'}}>
                        <div style={{flex:'1',borderRight:'1px solid black',paddingTop:'3%',paddingBottom:'3%'}}>
                            <Echart/>
                        </div>
                        <div style={{flex:'1',paddingTop:'3%',paddingBottom:'3%'}}>
                            <Echarts/>
                        </div>
                    </div>
                </Typography>

            </main>
        </div>
        </div>
    );
}
