import {Organization} from './organization.model';

export interface User {
    _id?: string;
    username: string;
    fullname: string;
    organizations: Organization[];
}