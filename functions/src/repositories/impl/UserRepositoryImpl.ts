import UserRepository from "../UserRepository";
import { db } from "../../firebase/firebase";
import UserEntity from "../../entites/UserEntity";
import { DatabaseConstraints } from "../../constraints/DatabaseConstraints";
import Utils from "../../utils/Utils";
import UserSearchCriteria from "../../entites/UserSearchCriteria";
import { firestore } from "firebase-admin";

export default class UserRepositoryImpl implements UserRepository {

    getNewPrimaryKey(): string {
        const userRef = db.collection(DatabaseConstraints.ROOT_USERS_COLLECTION_NAME).doc();
        return userRef.id;
    }

    async getUserById(userId: string): Promise<UserEntity | null> {

        const userRef = db.collection(DatabaseConstraints.ROOT_USERS_COLLECTION_NAME).doc(userId);
        console.log("Getting document: " + userRef.path);

        const doc = await userRef.get();
        if (!doc.exists) {
            console.log('User not found!');
            return null;
        } else {
            const userEntity: UserEntity = doc.data() as UserEntity;
            userEntity.id = doc.id;
            return userEntity;
        }
    }

    async searchUser(searchCriteria: UserSearchCriteria): Promise<UserEntity[]> {


        let userRef : firestore.Query<firestore.DocumentData> = db.collection(DatabaseConstraints.ROOT_USERS_COLLECTION_NAME);
        console.log("Searching users with:  " + JSON.stringify(searchCriteria));

        const userEntities : UserEntity[] = [];
        if (!Utils.isEmpty(searchCriteria.name)) {
            userRef = userRef.where("name", "==", searchCriteria.name);
        }

        if (!Utils.isEmpty(searchCriteria.email)) {
            userRef = userRef.where("email", "==", searchCriteria.email);
        }

        await userRef.get().then((dailySummarySnapshots) => {
            dailySummarySnapshots.forEach(function (snapshot) {
                var data = snapshot.data() as UserEntity;
                if (!Utils.isEmpty(data)) {
                    data.id = snapshot.id;
                    userEntities.push(data);
                }
            });
        });
        console.log("Found : " + userEntities.length + " users.");

        return userEntities;
    }

    async createUser(userEntity: UserEntity): Promise<UserEntity> {

        const userRef = db.collection(DatabaseConstraints.ROOT_USERS_COLLECTION_NAME).doc(userEntity.id);
        console.log("Setting document: " + userRef.path);

        return await userRef.set(userEntity).then(doc => {
            userEntity.id = userRef.id;
            console.log("Successfully created user: " + userEntity.id);
            return userEntity;
        }).catch((error) => {
                console.log('Error creating new user:' + error.message);
                throw error;
            });
    }
}
