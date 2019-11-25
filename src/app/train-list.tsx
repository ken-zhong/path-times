import React, { Fragment, useEffect } from 'react';
import { LinearProgress, Typography } from '@material-ui/core';

import { TrainInterface, TrainResource } from '../api/train-resource';
import { useStationContext } from '../api/hooks';
import { useQuery } from '../api/use-query';
import TrainItem from './train-item';

const TrainList: React.FC = () => {
  const { station } = useStationContext();
  const { data: trains, loading, refetch } = useQuery(TrainResource.listShape(), { station });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);
    return () => clearInterval(interval);
  }, [station]);

  let upcomingTrains = trains && trains.upcomingTrains;
  if (upcomingTrains) {
    upcomingTrains = upcomingTrains // sort the upcoming trains by arrival time
      .slice()
      .sort((a, b): number => (a.projectedArrival > b.projectedArrival ? 1 : -1));
  }

  if (loading) return <LinearProgress />;

  return (
    <Fragment>
      {upcomingTrains ? (
        upcomingTrains.map((train, idx) => <TrainItem train={train} key={idx} />)
      ) : (
        <Typography>No upcoming trains...</Typography>
      )}
    </Fragment>
  );
};

export default TrainList;
