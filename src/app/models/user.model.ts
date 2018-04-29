import {Organization} from './organization.model';

export interface User {
    _id?: string;
    username: string;
    fullname: string;
    encryptedPassword?: string;
    organizations: Organization[];
}