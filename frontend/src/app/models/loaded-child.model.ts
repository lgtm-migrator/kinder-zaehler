import {Child} from './child.model';

export interface LoadedChild extends Child {
  loaded: true;
  id: string;
}
