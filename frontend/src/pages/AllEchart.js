import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Echarts from './echarts.js';
import Echart from './echart.js';

const drawerWidth = 240;

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
            <div style={{margin:'20px 50px 0 30px'}}>
                <a href="#" style={{
                    color:'#858585',
                    fontSize:'18px',
                    textDecoration:'none'
                }}>
                    <span>全部商品</span>
                </a>
            </div>

        <div className={classes.root}>

            <main className={classes.content}>

                <Typography paragraph>
                                <h2 style={{textAlign:'center',backgroundColor:'darkgray',color:'white'}}>库存统计图</h2>
                                <div className={'shouye'} style={{display:'flex',boxSizing:'border-box'}}>
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
