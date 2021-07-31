import UserEntity from "../entites/UserEntity";
import UserSearchCriteria from "../entites/UserSearchCriteria";

export default interface UserRepository {

    getNewPrimaryKey(): string;
    getUserById(id: string): Promise<UserEntity | null>;
    searchUser(searchCriteria: UserSearchCriteria): Promise<UserEntity[]> 
    createUser(userEntity: UserEntity): Promise<UserEntity>;
}