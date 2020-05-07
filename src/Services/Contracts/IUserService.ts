import User from "../../Models/User";
export default interface IUserServices {
    Signup(name: string, username: string, email: string, password: string):Promise<any>,
    Login(username: string, password: string):Promise<any>,
    getByID(ID: string):Promise<any>,
    Update(user:User,image:string|ArrayBuffer):Promise<any>
}
