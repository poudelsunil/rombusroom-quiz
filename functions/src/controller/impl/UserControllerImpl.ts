import UserController from "../UserController";
import UserRepository from "../../repositories/UserRepository";
import UserEntity from "../../entites/UserEntity";
import Utils from "../../utils/Utils";
import GetUserByIdControllerRequest from "../../dto/users/GetUserByIdControllerRequest";
import ValidationError from "../../utils/ValidationError";
import UserInfo from "../../dto/users/UserInfo";
import CreateUserControllerRequest from "../../dto/users/CreateUserControllerRequest";
import CreateUserControllerResponse from "../../dto/users/CreateUserControllerResponse";

export default class UserControllerImpl implements UserController {

    userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async getById(request: GetUserByIdControllerRequest): Promise<UserInfo> {

        if (Utils.isEmpty(request.userId) || !request.userId) {
            throw new ValidationError("UserId should not be empty or null");
        }

        const userEntity: UserEntity | null
            = await this.userRepository.getUserById(request.userId);

        if (userEntity === null) {
            console.log("User Not Found");
            throw new ValidationError("User not found");
        }

        return this.toUserInfo(userEntity);
    }

    toUserInfo(userEntity: UserEntity): UserInfo {
        return userEntity;
    }


    async add(request: CreateUserControllerRequest): Promise<CreateUserControllerResponse> {

        await this.validateCreateUserControllerRequest(request);


        const userEntity: UserEntity = this.prepareUserEntity(request);
        const createdUserEntity: UserEntity | null
            = await this.userRepository.createUser(userEntity);
        return {
            id: createdUserEntity.id,
            name: createdUserEntity.name,
            email: createdUserEntity.email
        }
    }

    prepareUserEntity(request: CreateUserControllerRequest): UserEntity {

        return {
            id: this.userRepository.getNewPrimaryKey(),
            name: request.name || "",
            email: request.emailAddress || "",
            googleSSOId: request.googleSSOId || ""
        };

    }


    async validateCreateUserControllerRequest(request: CreateUserControllerRequest) {

        if (!request || !request.name || Utils.isEmpty(request.name)) {
            throw new ValidationError("Name is missing");
        }

        // if (!request || Utils.isEmpty(request.emailAddress)) {
        //     throw new ValidationError("Email is missing");
        // }

        // if (!request || Utils.isEmpty(request.googleSSOId)) {
        //     throw new ValidationError("Google SSO id is missing");
        // }

        await this.duplicateNameValidation(request.name);
    }

    async duplicateNameValidation(name: string) {

        const userEntities: UserEntity[]
            = await this.userRepository.searchUser({ name: name });

        if (userEntities && userEntities.length >= 1) {
            throw new ValidationError("User with name " + name + " already exist");
        }

    }

}
