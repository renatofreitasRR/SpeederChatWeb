export interface IUser {
    id: string;
    userNickName: string;
    side: 'Right' | 'Left';
    sended?: boolean;
}
