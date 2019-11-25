import React, { Suspense } from 'react';
import { CacheProvider, NetworkErrorBoundary } from 'rest-hooks';
import { LinearProgress } from '@material-ui/core';

import { StationContext, useStationSelector } from '../api/hooks';

const RestContainer: React.FC = ({ children }) => {
  const { station, setStation } = useStationSelector();

  return (
    <CacheProvider>
      <NetworkErrorBoundary>
        <StationContext.Provider value={{ station, setStation }}>
          {children}
        </StationContext.Provider>
      </NetworkErrorBoundary>
    </CacheProvider>
  );
};

export default RestContainer;
