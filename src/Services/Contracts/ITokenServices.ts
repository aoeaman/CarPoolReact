export default interface ITokenServices{
    getAuthString():string,
    getUserID():string,
    getToken():string,
    setToken(token:string):void,
    removeToken():void
}
