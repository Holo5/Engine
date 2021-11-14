import { UserStatusType } from './UserStatusType';

export class UserStatus {
    public static getFromId(id: number) {
        let role: string;

        switch (id) {
            case 0:
                role = UserStatusType.USER;
                break;
            case 1:
                role = UserStatusType.CONTROLLER;
                break;
            case 4:
                role = UserStatusType.OWNER;
                break;
            default:
                role = UserStatusType.USER;
                break;
        }

        return role;
    }

    public static getFromName(name: string) {
        let role: number;

        switch (name) {
            case UserStatusType.USER:
                role = 0;
                break;
            case UserStatusType.CONTROLLER:
                role = 1;
                break;
            case UserStatusType.OWNER:
                role = 4;
                break;
            default:
                role = 0;
                break;
        }

        return role;
    }
}
