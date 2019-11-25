import { useReducer, useContext, createContext } from 'react';
import { useQueryParam, StringParam } from 'use-query-params';

interface StationInterface {
  station: string | undefined;
  setStation: Function;
}

export const StationContext = createContext<StationInterface>({
  station: '',
  setStation: () => null
});

export const useStationSelector = (): StationInterface => {
  const [station, setter] = useQueryParam('station', StringParam);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const setStation = async (val: string) => {
    await setter(val);
    return forceUpdate(0);
  };

  return { station, setStation };
};

// returns { station, setStation }
export const useStationContext = () => {
  return useContext(StationContext);
};
