import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import { TrainInterface } from '../api/train-resource';

const useStyles = makeStyles(
  createStyles({
    root: {
      margin: '12px 0',
      padding: '0 12px'
    }
  })
);

// SAMPLE RESPONSE
// {
//   "lineName": "33rd Street via Hoboken",
//   "lineColors": [
//     "#4D92FB",
//     "#FF9900"
//   ],
//   "projectedArrival": "2019-11-22T10:31:54Z",
//   "lastUpdated": "2019-11-22T09:41:29Z",
//   "status": "ON_TIME",
//   "headsign": "33rd Street via Hoboken",
//   "route": "JSQ_33_HOB",
//   "routeDisplayName": "Journal Square - 33rd Street (via Hoboken)",
//   "direction": "TO_NY"
// },

const TrainItem: React.FC<{ train: TrainInterface }> = ({ train }) => {
  const classes = useStyles();

  let timeToArrival = moment(train.projectedArrival).diff(moment(), 'minutes');
  if (timeToArrival < 0) timeToArrival = 0;

  return (
    <Card classes={classes}>
      <CardContent>
        <CardHeader title={train.lineName} />
        {train.lineColors.map((lineColor: string, idx: number) => (
          <div key={`lc-${idx}`} style={{ borderBottom: `4px solid ${lineColor}` }} />
        ))}
        <CardContent>
          <div>
            <Typography variant="h6" color={timeToArrival !== 0 ? 'primary' : 'error'}>
              Arriving in: {timeToArrival} min
            </Typography>
            <Typography>Status: {train.status.replace('_', ' ')}</Typography>
            <Typography>Direction: {train.direction.replace('_', ' ')}</Typography>
          </div>
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default TrainItem;
