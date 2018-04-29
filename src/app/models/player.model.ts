import {Organization} from './organization.model';

export interface Player {
    _id?: string;
    username: string;
    password: string;
    location: string;
    organization: Organization;
    logins: Date[];
}