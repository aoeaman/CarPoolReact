var jwtDecode = require('jwt-decode');
var TokenServices={
    getAuthString:function(){
        return `Bearer ${JSON.parse(TokenServices.getToken())}`;
    },
    getUserID:function(){
        return jwtDecode(TokenServices.getToken())['unique_name'];
    },
    getToken:function(){
        return localStorage.getItem('Usertoken');
    },
    setToken:function(token:string){
        localStorage.setItem('Usertoken',token);
    },
    removeToken:function(){
        localStorage.clear();
    }
}
export default TokenServices;