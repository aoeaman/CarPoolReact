import Axios from "axios";
import User from "../Models/User";
import Login from "../Models/Login";
import TokenServices from "./TokenServices";
export default class UserServices {
    async Signup(name: string, username: string, email: string, password: string) {
        var user = new User();
        user.username = username;
        user.password = password;
        user.name = name;
        user.phoneNumber = '000000';
        const responce = await Axios.post('https://localhost:5001/api/user/Signup', user);
        return JSON.stringify(responce.data.message);
    }
    async Login(username: string, password: string) {
        var user = new Login(username, password);
        const responce = await Axios.post('https://localhost:5001/api/user/Login', user);
        return JSON.stringify(responce.data);
    }
    async getByID(ID: string) {
        let user: User;
        const AuthStr = TokenServices.getAuthString();
        const responce = Axios.get(`https://localhost:5001/api/user/${ID}`, { headers: { Authorization: AuthStr } });
        user = JSON.parse(JSON.stringify((await responce).data));
        return user
    }
}
