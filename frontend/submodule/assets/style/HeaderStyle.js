const HeaderStyle = (theme) => ({
    Link: {
        color: "white"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    MuiGridItem:{
        padding :'0 20px 0 0 !important'
    },
    list: {
        width: 170,
    },
    fullList: {
        width: 'auto',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
})
export default HeaderStyle