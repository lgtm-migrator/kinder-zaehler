import {Scout} from './scout.model';

export interface LoadedScout extends Scout {
  loaded: true;
  id: string;
}
