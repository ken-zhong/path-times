import { Resource } from 'rest-hooks';

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

export interface TrainInterface {
  readonly lineName: string;
  readonly lineColors: string[];
  readonly projectedArrival: string;
  readonly lastUpdated: string;
  readonly status: string;
  readonly headsign: string;
  readonly route: string;
  readonly routeDisplayName: string;
  readonly direction: string;
}

export class TrainResource extends Resource {
  readonly lineName: string = '';
  readonly lineColors: string[] = [];
  readonly projectedArrival: string = '';
  readonly lastUpdated: string = '';
  readonly status: string = '';
  readonly headsign: string = '';
  readonly route: string = '';
  readonly routeDisplayName: string = '';
  readonly direction: string = '';

  static listShape<T extends typeof Resource>(this: T) {
    return {
      ...super.listShape(),
      getFetchKey: ({ station = 'hoboken' }: { station: string }) => {
        return `https://path.api.razza.dev/v1/stations/${station}/realtime`;
      },
      fetch: ({ station = 'hoboken' }: { station: string }) => {
        return this.fetch('get', `https://path.api.razza.dev/v1/stations/${station}/realtime`);
      },
      schema: { upcomingTrains: [this.getEntitySchema()] }
    };
  }

  pk() {
    return this.lineName + this.projectedArrival;
  }

  static urlRoot = 'path-razza-api';
}
