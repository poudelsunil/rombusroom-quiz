import GetUserByIdControllerRequest from "../dto/users/GetUserByIdControllerRequest";
import UserInfo from "../dto/users/UserInfo";
import CreateUserControllerRequest from "../dto/users/CreateUserControllerRequest";
import CreateUserControllerResponse from "../dto/users/CreateUserControllerResponse";

export default interface UserController {
    getById(request: GetUserByIdControllerRequest): Promise<UserInfo>;

    add(request: CreateUserControllerRequest): Promise<CreateUserControllerResponse>;
}