import React, { Suspense } from 'react';

import { CircularProgress, LinearProgress, Typography } from '@material-ui/core';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import StationSelector from './station-selector';
import TrainList from './train-list';

const useStyles = makeStyles(
  createStyles({
    container: {
      backgroundColor: '#f5f5f5',
      display: 'flex',
      justifyContent: 'center',
      minHeight: '100vh'
    },
    width: {
      width: 600,
      padding: 12
    }
  })
);

const Layout: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.width}>
        <Typography variant="h5" align="center" gutterBottom>
          Path Times
        </Typography>
        <StationSelector />
        <TrainList />
      </div>
    </div>
  );
};

export default Layout;
