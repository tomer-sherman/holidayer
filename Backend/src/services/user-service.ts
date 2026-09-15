import { userController } from "../controllers/user-controller";
import { CredentialsModel, UserModel } from "../models/user-model";
import { IUserModel } from "../models/user-model";
import { security } from "../utils/security";

// Logic:
class UserService {

    // Register:
    public async register(user: IUserModel): Promise<string> {

        const dbUser = await user.save();
        const jwt = security.generateJwt(dbUser);
        return jwt;

    }

    public async login(credentials: CredentialsModel): Promise<string> {

        credentials.password = security.hashPassword(credentials.password);
        const dbUserArr = await UserModel.find({ email: credentials.email, password: credentials.password }).exec() as IUserModel[];
        const dbUser = dbUserArr[0];

        const jwt = security.generateJwt(dbUser);
        return jwt;

    }

    



}

export const userService = new UserService();
