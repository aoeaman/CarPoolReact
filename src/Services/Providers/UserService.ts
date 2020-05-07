import Axios from "axios";
import User from "../../Models/User";
import Login from "../../Models/Login";
import TokenServices from "./TokenServices";
import IUserServices from "../Contracts/IUserService";
export default class UserServices implements IUserServices {
    async Signup(name: string, username: string, email: string, password: string) {
        let user:User = new User();
        user.username = username;
        user.password = password;
        user.name = name;
        user.phoneNumber = '000000';
        const responce = await Axios.post('https://localhost:5001/api/user/Signup', user);
        return JSON.stringify(responce.data.message);
    }
    async Login(username: string, password: string) {
        let Credentials:Login = new Login(username, password);
        const responce = await Axios.post('https://localhost:5001/api/user/Login', Credentials);
        return JSON.stringify(responce.data);
    }
    async getByID(ID: string) {
        let user: User;
        const AuthStr = TokenServices.getAuthString();
        const responce = Axios.get(`https://localhost:5001/api/user/${ID}`, { headers: { Authorization: AuthStr } });
        user = (await responce).data;
        return user;
    }
    async Update(user:User,image:string|ArrayBuffer){
        user.profileImage=image.toString();
        const AuthStr = TokenServices.getAuthString();
        const responce = Axios.post(`https://localhost:5001/api/user/UpdateUser`,user,{ headers: { Authorization: AuthStr } });
        let _user:User = (await responce).data;
        return _user;
    }
}
