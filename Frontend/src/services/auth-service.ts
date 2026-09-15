import { CredentialsModel, RegisterFormModel } from "../models/user-models";
import axios from "axios"
import { appConfig } from "../utils/app-config";

class AuthService {

    public async register(form: RegisterFormModel): Promise<string> {

        const response = await axios.post<string>(appConfig.registerUrl, form);
        const jwt = response.data;

        // Store jwt in local storage or session storage 
        // // and the global state.


        return jwt;


    }


    public async login(credentials: CredentialsModel): Promise<string> {

        const response = await axios.post<string>(appConfig.loginUrl, credentials);
        const jwt = response.data;

        //Store in local/seccion storage 
        //Store in global state

        return jwt;
    }

    public async logout():Promise<void>{

        //Remove from local Storage the token
        //Set global state var to null

    }


}

export const authService = new AuthService();
