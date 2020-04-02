import Axios from "axios";
import User from "../Models/User";
import Login from "../Models/Login";
export default class UserServices{
    async Signup(username:string,password:string){
        var user=new User(username,password);
        user.Name="Default";
        user.PhoneNumber='000000';
        const responce= await Axios.post('https://localhost:5001/api/user/Signup',user);
        return await JSON.stringify(responce.data.message);
    }
    async Login(username:string,password:string){
        var user=new Login(username,password);
        const responce= await Axios.post('https://localhost:5001/api/user/Login',user);
        return await JSON.stringify(responce.data);
    }
    async getUserByID(ID:string){
        
    }
}
