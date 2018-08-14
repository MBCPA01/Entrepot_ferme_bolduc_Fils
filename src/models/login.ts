export interface LoginParams {
    success?:{
        additionalUserInfo?:object
        
    }
    error?:{
        code?:string;
        message?:string;
        stack?:string;
    }
}