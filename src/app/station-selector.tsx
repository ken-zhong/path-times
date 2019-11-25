import React, { Fragment } from 'react';
import { Select, Typography } from '@material-ui/core';

import { STATIONS } from '../api/constants';
import { useStationContext } from '../api/hooks';

const StationSelector: React.FC = () => {
  const { station, setStation } = useStationContext();

  return (
    <Fragment>
      <Typography variant="overline">Select Station</Typography>
      <Select
        native
        fullWidth
        variant="outlined"
        value={station}
        onChange={(e: any): void => setStation(e.currentTarget.value)}
      >
        {STATIONS.map((s: string) => (
          <option key={s} value={s}>
            {s
              .toUpperCase()
              .split('_')
              .join(' ')}
          </option>
        ))}
      </Select>
    </Fragment>
  );
};

export default StationSelector;
