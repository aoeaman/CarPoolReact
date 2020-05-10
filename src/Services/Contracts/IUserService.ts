import User from "../../Models/User";
export default interface IUserServices {
    Signup(name: string, username: string, email: string, password: string):Promise<string>,
    Login(username: string, password: string):Promise<string>,
    getByID(ID: string):Promise<User>,
    Update(user:User,image:string|ArrayBuffer):Promise<User>
}
