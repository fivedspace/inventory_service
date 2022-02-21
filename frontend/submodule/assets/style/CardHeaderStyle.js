import {hexToRgb} from "../../util/util";
import {blackColor, error, info, primary, success, warning, whiteColor} from "../../util/theme";

const cardHeaderStyle = {
    cardHeader: {
        padding: "0.75rem 1.25rem",
        marginBottom: "0",
        borderBottom: "none",
        background: "transparent",
        zIndex: "3 !important",
        "&$cardHeaderPlain,&$cardHeaderIcon,&$cardHeaderStats,&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader": {
            // margin: "0 15px",
            padding: "0",
            position: "relative",
            color: whiteColor
        },
        "&:first-child": {
            borderRadius: "calc(.25rem - 1px) calc(.25rem - 1px) 0 0"
        },
        "&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader": {
            "&:not($cardHeaderIcon)": {
                borderRadius: "6px",
                // marginTop: "-20px",
                padding: "10px"
            }
        },
        "&$cardHeaderStats svg": {
            fontSize: "36px",
            lineHeight: "56px",
            textAlign: "center",
            width: "36px",
            height: "36px",
            margin: "10px 10px 4px"
        },
        "&$cardHeaderStats i,&$cardHeaderStats .material-icons": {
            fontSize: "36px",
            lineHeight: "56px",
            width: "56px",
            height: "56px",
            textAlign: "center",
            overflow: "unset",
            marginBottom: "1px"
        },
        "&$cardHeaderStats$cardHeaderIcon": {
            textAlign: "right"
        }
    },
    cardHeaderPlain: {
        marginLeft: "0px !important",
        marginRight: "0px !important"
    },
    cardHeaderStats: {
        "& $cardHeaderIcon": {
            textAlign: "right"
        },
        "& h1,& h2,& h3,& h4,& h5,& h6": {
            margin: "0 !important"
        }
    },
    cardHeaderIcon: {
        "&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader": {
            background: "transparent",
            boxShadow: "none"
        },
        "& i,& .material-icons": {
            width: "33px",
            height: "33px",
            textAlign: "center",
            lineHeight: "33px"
        },
        "& svg": {
            width: "24px",
            height: "24px",
            textAlign: "center",
            lineHeight: "33px",
            margin: "5px 4px 0px"
        }
    },
    warningCardHeader: {
        color: whiteColor,
        "&:not($cardHeaderIcon)": {
            background:
            warning,
            boxShadow:
                "0 4px 20px 0 rgba(" +
                hexToRgb(blackColor) +
                ",.14), 0 7px 10px -5px rgba(" +
                hexToRgb(warning) +
                ",.4)"
        }
    },
    successCardHeader: {
        color: whiteColor,
        "&:not($cardHeaderIcon)": {
            background:
            success,
            boxShadow:
                "0 4px 20px 0 rgba(" +
                hexToRgb(blackColor) +
                ",.14), 0 7px 10px -5px rgba(" +
                hexToRgb(success) +
                ",.4)"
        }
    },
    dangerCardHeader: {
        color: whiteColor,
        "&:not($cardHeaderIcon)": {
            background:
            error,
            boxShadow:
                "0 4px 20px 0 rgba(" +
                hexToRgb(blackColor) +
                ",.14), 0 7px 10px -5px rgba(" +
                hexToRgb(error) +
                ",.4)"
        }
    },
    infoCardHeader: {
        color: whiteColor,
        "&:not($cardHeaderIcon)": {
            background:
            info,
            boxShadow:
                "0 4px 20px 0 rgba(" +
                hexToRgb(blackColor) +
                ",.14), 0 7px 10px -5px rgba(" +
                hexToRgb(info) +
                ",.4)"
        }
    },
    primaryCardHeader: {
        color: whiteColor,
        "&:not($cardHeaderIcon)": {
            background:
            primary,
            boxShadow:
                "0 4px 20px 0 rgba(" +
                hexToRgb(blackColor) +
                ",.14), 0 7px 10px -5px rgba(" +
                hexToRgb(primary) +
                ",.4)"
        }
    }
};
export default cardHeaderStyle