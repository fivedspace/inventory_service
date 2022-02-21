import React ,{useState}from 'react';
import clsx from 'clsx';
import { makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
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
  filterBtn:{
    '&>button':{
      width:'140px',
      borderRadius:'20px'
    },
    display:'flex',
    justifyContent:'space-evenly',
    width:'100%',
    position:'absolute',
    left:'0px',
    bottom:'10px'
  },
}));

export default function ListAnchor(props) {
  const {imports} = props;
  const {typographyText,drawerShape,DirectionsIcon,fieldList,ascertain,reset} = imports
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
        <DirectionsIcon/>
      </Typography>
      <React.Fragment >
        <Drawer
          anchor={drawerShape}
          open={drawerState[drawerShape]}
        >
          {/* 标题 */}
          <Typography variant="h6" className={classes.typography}>
            {typographyText}
          </Typography>
          {/* 字段列表 */}
          <FieldList anchor={drawerShape} />
          {/* 底部按钮 */}
          <div className={classes.filterBtn}>
            <Button
              variant="contained"
              color="secondary"
              onClick={()=>{
                reset()
                setDrawerState({ ...drawerState, [drawerShape]: false });
              }}
            >
              重置
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={()=>{
                ascertain()
                setDrawerState({ ...drawerState, [drawerShape]: false });
              }}
            >
              确定
            </Button>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}

ListAnchor.defaultProps = {
  imports:{
      drawerShape: 'right',
      drawerText: '点击',
      typographyText: 'Filter',
      fieldList: () => {return null}
}
}
ListAnchor.propTypes = {
  drawerShape: PropTypes.string,// 抽屉划出的方向
  typographyText: PropTypes.string,//标题
  fieldList : PropTypes.func,//字段列表
  reset : PropTypes.func,// 重置事件
  ascertain : PropTypes.func// 确定事件
}