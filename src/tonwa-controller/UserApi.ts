export interface UserApi {
    userFromId(id: number): Promise<any>;
    userFromName(userName: string): Promise<any>;
}
