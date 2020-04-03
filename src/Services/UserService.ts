import Axios from "axios";
import User from "../Models/User";
import Login from "../Models/Login";
export default class UserServices {
    async Signup(username: string, password: string) {
        var user = new User();
        user.Username = username;
        user.Password = password;
        user.Name = "Default";
        user.PhoneNumber = '000000';
        const responce = await Axios.post('https://localhost:5001/api/user/Signup', user);
        return JSON.stringify(responce.data.message);
    }
    async Login(username: string, password: string) {
        var user = new Login(username, password);
        const responce = await Axios.post('https://localhost:5001/api/user/Login', user);
        return JSON.stringify(responce.data);
    }
    async getUserByID(ID: string) {
        let user: User;
        const AuthStr = `Bearer ${JSON.parse(localStorage.getItem('Usertoken'))}`;
        // const request = new XMLHttpRequest();
        // const promice = new Promise(async (resolve, reject) => {

        //     request.open('GET', `https://localhost:5001/api/user/${ID}`);
        //     request.setRequestHeader('Authorization', AuthStr);
        //     request.onload = () => {
        //         if (request.status === 200) {
        //             resolve(request.response);
        //         } else {
        //             reject(Error(request.statusText));
        //         }
        //     }
        //     request.onerror = () => {
        //         reject(Error('Error fetching data.'));
        //     };
        //     await request.send();
        // });
        // promice.then((data) => {
        //     console.log(JSON.parse(JSON.stringify(data)));
        //     user=JSON.parse(JSON.stringify(data));
        //     console.log('user= '+user);
        // });

        const responce=Axios.get(`https://localhost:5001/api/user/${ID}`,{headers:{ Authorization: AuthStr } }); 
        user=JSON.parse(JSON.stringify((await responce).data));
        return user
    }
}
