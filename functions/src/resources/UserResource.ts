import Utils from "../utils/Utils";
import GetUserByIdControllerRequest from "../dto/users/GetUserByIdControllerRequest";
import UserController from "../controller/UserController";
import UserControllerImpl from "../controller/impl/UserControllerImpl";
import UserInfo from "../dto/users/UserInfo";
import CreateUserAdaptor from "./adapters/CreateUserAdaptor";
import CreateUserControllerRequest from "../dto/users/CreateUserControllerRequest";
import CreateUserControllerResponse from "../dto/users/CreateUserControllerResponse";

import UserRepository from "../repositories/UserRepository";
import UserRepositoryImpl from "../repositories/impl/UserRepositoryImpl";
const userRepository: UserRepository = new UserRepositoryImpl();
const userController: UserController = new UserControllerImpl(userRepository);
const createUserAdaptor: CreateUserAdaptor = new CreateUserAdaptor();
const createUserController: UserController = new UserControllerImpl(userRepository);


export async function getUserById(req : any, res : any) {

    console.log("Getting user");

    const request: GetUserByIdControllerRequest = new GetUserByIdControllerRequest(req.params.id);
    console.log("GetUserByIdControllerRequest : " + JSON.stringify(request));

    userController.getById(request).then((user: UserInfo) => {
        return res.status(200).send(user);
    }).catch(e => {

        return Utils.prepareHttpErrorResponse(res, e);
    });

}

export async function createUser(req : any, res : any) {

    console.log("Creating user");

    const createUserControllerRequest: CreateUserControllerRequest = createUserAdaptor.toServiceObject(req.body);
    console.log("CreateUserControllerRequest : " + JSON.stringify(createUserControllerRequest));

    createUserController.add(createUserControllerRequest).then((user: CreateUserControllerResponse) => {
        return res.status(200).send(user);
    }).catch((e: any) => {
        return Utils.prepareHttpErrorResponse(res, e);
    });

}