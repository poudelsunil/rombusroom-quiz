import QuizSessionRepository from "../QuizSessionRepository";
import { db } from "../../firebase/firebase";
import QuizSessionEntity from "../../entites/QuizSessionEntity";
import { DatabaseConstraints } from "../../constraints/DatabaseConstraints";
import Utils from "../../utils/Utils";
import QuizSessionSearchCriteria from "../../entites/QuizSessionSearchCriteria";
import { firestore } from "firebase-admin";

export default class QuizSessionRepositoryImpl implements QuizSessionRepository {

    getNewPrimaryKey(): string {
        const quizSessionRef = db.collection(DatabaseConstraints.ROOT_QUIZ_SESSION_COLLECTION_NAME).doc();
        return quizSessionRef.id;
    }

    async getAll(): Promise<QuizSessionEntity[]>{

        let quizSessionRef : firestore.Query<firestore.DocumentData> = db.collection(DatabaseConstraints.ROOT_QUIZ_SESSION_COLLECTION_NAME);
        console.log("Getting all quiz sessions");

        const quizEntities : QuizSessionEntity[] = [];
        await quizSessionRef.get().then((dailySummarySnapshots) => {
            dailySummarySnapshots.forEach(function (snapshot) {
                var data = snapshot.data() as QuizSessionEntity;
                if (!Utils.isEmpty(data)) {
                    data.id = snapshot.id;
                    quizEntities.push(data);
                }
            });
        });
        console.log("Found : " + quizEntities.length + " quiz sessions.");

        return quizEntities;
    }

    async getOne(id: string): Promise<QuizSessionEntity | null> {

        const quizSessionRef = db.collection(DatabaseConstraints.ROOT_QUIZ_SESSION_COLLECTION_NAME).doc(id);
        console.log("Getting document: " + quizSessionRef.path);

        const doc = await quizSessionRef.get();
        if (!doc.exists) {
            console.log('QuizSession not found!');
            return null;
        } else {
            const quizEntity: QuizSessionEntity = doc.data() as QuizSessionEntity;
            quizEntity.id = doc.id;
            return quizEntity;
        }
    }

    async searchQuizSession(searchCriteria: QuizSessionSearchCriteria): Promise<QuizSessionEntity[]> {


        let quizSessionRef : firestore.Query<firestore.DocumentData> = db.collection(DatabaseConstraints.ROOT_QUIZ_SESSION_COLLECTION_NAME);
        console.log("Searching quiz sessions with:  " + JSON.stringify(searchCriteria));

        const quizEntities : QuizSessionEntity[] = [];
        if (!Utils.isEmpty(searchCriteria.name)) {
            quizSessionRef = quizSessionRef.where("name", "==", searchCriteria.name);
        }

    //    TODO

        await quizSessionRef.get().then((dailySummarySnapshots) => {
            dailySummarySnapshots.forEach(function (snapshot) {
                var data = snapshot.data() as QuizSessionEntity;
                if (!Utils.isEmpty(data)) {
                    data.id = snapshot.id;
                    quizEntities.push(data);
                }
            });
        });
        console.log("Found : " + quizEntities.length + " quiz sessions.");

        return quizEntities;
    }

    async insert(quizSessionEntity: QuizSessionEntity): Promise<QuizSessionEntity> {

        const quizSessionRef = db.collection(DatabaseConstraints.ROOT_QUIZ_SESSION_COLLECTION_NAME).doc(quizSessionEntity.id);
        console.log("Setting document: " + quizSessionRef.path);

        return await quizSessionRef.set(quizSessionEntity).then(doc => {
            quizSessionEntity.id = quizSessionRef.id;
            console.log("Successfully created quiz session: " + quizSessionEntity.id);
            return quizSessionEntity;
        }).catch((error) => {
                console.log('Error creating new quiz session:' + error.message);
                throw error;
            });
    }

    async update(id: string, entityToUpdate?: any): Promise<any> {

        entityToUpdate["id"] = id;

        const docRef = db.collection(DatabaseConstraints.ROOT_QUIZ_SESSION_COLLECTION_NAME).doc(id);
        console.log("Updating quiz session : " + docRef.path + " : " + JSON.stringify(entityToUpdate));
        await docRef.set(entityToUpdate, { merge: true });
        return entityToUpdate;
    }
}
