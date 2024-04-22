import { INotification } from '../../interfaces/INotification';

export interface IUseGetNotificationsParams {
  id: string;
}

export type IFetchedNotification = INotification[];
