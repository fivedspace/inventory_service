import React ,{useState}from 'react';
import clsx from 'clsx';
import { makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme)=>({
  list: {
    width: 320,
    padding : '5px 10px 0',
    boxSizing : 'border-box',
    height: 'calc(100% - 102px)',
    overflowY: 'auto',
    '&::-webkit-scrollbar':{
      width:0
    }
  },
  fullList: {
    width: 'auto',
  },
  typography:{
    padding:'20px 10px 0'
  },
}));

export default function ListAnchor(props) {
  const {typographyText, drawerShape, drawerContent,fieldList} = props.imports
  const classes = useStyles();
  const [drawerState, setDrawerState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const FieldList = (props) => {
    const {anchor} = props
    return (
      <div
        className={clsx(classes.list, {[classes.fullList]: anchor === "top" || anchor === "bottom",})}
      >
        {fieldList()}
      </div>
    )
  };

  return (
    <div>
      <Typography onClick={toggleDrawer(drawerShape, true)} variant="subtitle2">
        {drawerContent}
      </Typography>
      <React.Fragment >
        <Drawer
          anchor={drawerShape}
          open={drawerState[drawerShape]}
          onClose={toggleDrawer(drawerShape, false)}
        >
          {/* 标题 */}
          <Typography variant="h6" className={classes.typography}>
            {typographyText}
          </Typography>
          {/* 字段列表 */}
          <FieldList anchor={drawerShape} />
        </Drawer>
      </React.Fragment>
    </div>
  );
}

ListAnchor.defaultProps = {
  drawerShape: 'right',
  drawerText: '点击',
  typographyText: 'Filter',
  fieldList : ()=>{}
}

ListAnchor.propTypes = {
  drawerShape: PropTypes.string,// 抽屉划出的方向
  typographyText: PropTypes.string,//标题
  fieldList : PropTypes.func,//字段列表
}