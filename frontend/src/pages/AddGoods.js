import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function Inputs() {
    const classes = useStyles();

    return (
        <div>
            <div style={{margin:'20px 50px'}}>
                <a href="#" style={{
                    color:'#858585',
                    fontSize:'18px',
                    textDecoration:'none'
                }}>
                    <span>添加商品</span>
                </a>
            </div>
            <div style={{boxSizing:'border-box',padding:'0 50px'}}>
                <form className={classes.root}
                      style={{
                          width:'100%',
                          padding:'2px 4px',
                          display:'flex',
                          backgroundColor:'#ab47bc',
                      }}
                      noValidate autoComplete="off"
                >
                    <InputBase
                        className={classes.margin}
                        defaultValue="添加商品"
                        style={{
                            // flex:'1',
                            backgroundColor:'white',
                            padding:'6px 0 7px 6px',
                            border:'1px solid black'
                        }}
                        fullWidth='true'
                        inputProps={{ 'aria-label': 'naked' }}
                    />
                </form>
            </div>
        </div>
    );
}
