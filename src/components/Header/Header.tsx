import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const headerHeight = 55;

const useStyles = makeStyles((theme) => createStyles({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: headerHeight,
  },
  toolbar: {
    minHeight: headerHeight,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      className={classes.appBar}
    >
      <Toolbar classes={{ regular: classes.toolbar }}>
        <Typography variant="h6" noWrap>
          Sound Manager
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
