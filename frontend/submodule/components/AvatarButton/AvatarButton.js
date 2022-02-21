import {Button, Avatar } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        marginBottom: "10%"
    },
}));

export default function AvatarButton({ imgAlt, imgSrc, btnText, notifyButtonClick, ...rest}) {
    const classes = useStyles();
    return (
        <center>
            <Avatar alt={imgAlt} 
                    src={imgSrc} 
                    className={classes.large} />
            <Button onClick={notifyButtonClick}
                    variant="contained"
                    verticalalign="middle"
                    display="table-cell"
                    {...rest}
                    >
                {btnText}
            </Button>
        </center>
    );
}

AvatarButton.defaultProps = {
    imgAlt: "image",
    btnText: "ButtonText",
};

AvatarButton.propTypes = {
    imgAlt: PropTypes.string,
    imgSrc: PropTypes.string,
    btnText: PropTypes.string,
    notifyButtonClick: PropTypes.func,
    children: PropTypes.node,
};
