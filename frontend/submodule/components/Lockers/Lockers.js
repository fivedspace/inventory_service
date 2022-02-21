import React, { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ImageListItemBar } from "@mui/material";
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`
    }
}

export default function QuiltedImageList(props) {
    const { itemData, columns, rowHeight = 121 } = props;
    let cols;
    if (columns) {
        cols = parseInt(columns)
    }

    function CheckBoxChange(props) {
        const { item, rowHeight = 121, notifyOnClick, checkChange } = props
        return (
            <Tooltip disableFocusListener title={item.price ? `储物格价格：${item.price == '无' ? '无' : item.price + '元/小时'}`: `储物柜位置：${item.address}`}>
                <ImageListItem
                    key={item.id}
                    cols={item.cols || 1}
                    rows={item.rows || 1}
                    style={{ "border": item.highlight ? item.highlight : '1px solid black', "cursor": "pointer", "position": "relative" }}
                >
                    {
                        item.is_selected ? (
                            <Checkbox
                                checked={item.is_check}
                                onChange={(event) => {
                                    checkChange(event.target.checked, item)
                                }}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                style={{
                                    position: 'absolute',
                                    padding: '0',
                                    top: '-2px',
                                    left: '-2px'
                                }}
                            />
                        ) : <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', position: 'absolute', left: '0', top: '0' }} />
                    }
                    <img
                        {...srcset(item.img, rowHeight, item.rows, item.cols)}
                        alt={item.title}
                        loading="lazy"
                        onClick={() => {
                            notifyOnClick(item)
                        }}
                    />
                    <ImageListItemBar
                        style={{
                            height: '24px',
                            textAlign: 'center',
                            padding: '0'
                            
                        }}
                        title={item.title}
                    />
                </ImageListItem>
            </Tooltip>
        )
    }
    return (
        <ImageList
            variant="quilted"
            cols={cols}
            rowHeight={rowHeight}
        >
            {itemData.map((item, index) => {
                return <CheckBoxChange key={index} {...props} item={item} />
            })}
        </ImageList>
    );
}
