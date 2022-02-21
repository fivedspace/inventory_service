import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {ImageListItemBar} from "@mui/material";

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
            size * rows
        }&fit=crop&auto=format&dpr=2 2x`
    }
}

export default function QuiltedImageList(props) {
    const {itemData, columns, rowHeight = 121, notifyOnClick} = props;
    let cols;
    if (columns){
        cols = parseInt(columns)
    }
    return (
        <ImageList
            variant="quilted"
            cols={cols}
            rowHeight={rowHeight}
            style={{"border": "1px solid black"}}
        >
            {itemData.map((item, index) => (
                <ImageListItem
                    onClick={() => {
                        notifyOnClick(item, index)
                    }}
                    key={item.id}
                    cols={item.cols || 1}
                    rows={item.rows || 1}
                    style={{"border": "1px solid black", "cursor": "pointer"}}
                >
                    <img
                        {...srcset(item.img, rowHeight, item.rows, item.cols)}
                        alt={item.title}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.title}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}
