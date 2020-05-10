import ITokenServices from "Services/Contracts/ITokenServices";

var jwtDecode = require('jwt-decode');
var TokenServices:ITokenServices={
    getAuthString:function():string{
        return `Bearer ${JSON.parse(TokenServices.getToken())}`;
    },
    getUserID:function():string{
        return jwtDecode(TokenServices.getToken())['unique_name'];
    },
    getToken:function():string{
        return localStorage.getItem('Usertoken');
    },
    setToken:function(token:string):void{
        localStorage.setItem('Usertoken',token);
    },
    removeToken:function():void{
        localStorage.removeItem('Usertoken');
    }
}
export default TokenServices;