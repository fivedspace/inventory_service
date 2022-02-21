import {createTheme} from '@material-ui/core/styles';
import {red} from '@material-ui/core/colors';

const blackColor = "#000";
const whiteColor = "#FFF";
const primary = "#3F51B5";
// const primary = "#6db43f"; //测试用
const secondary = "#F50057"
// const error = red.A400
// const warning = "#ffb74d"
// const info = "#64b5f6"
// const success = "#81c784"
const error = '#f44336'
const warning = "#ff9800"
const info = "#2196f3"
const success = "#4caf50"

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: primary,
        },
        secondary: {
            main: secondary,
        },
        error: {
            main: error,
        },
        warning: {
            main: warning,
        },
        info: {
            main: info,
        },
        success: {
            main: success
        },
        background: {
            default: whiteColor,
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: "300",
        lineHeight: "1.5em"
    }
});

export {
    theme,
    blackColor,
    whiteColor,
    primary,
    secondary,
    error,
    warning,
    info,
    success
};
