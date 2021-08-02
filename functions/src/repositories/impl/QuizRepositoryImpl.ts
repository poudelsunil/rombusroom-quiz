import QuizRepository from "../QuizRepository";
import { db } from "../../firebase/firebase";
import QuizEntity from "../../entites/QuizEntity";
import { DatabaseConstraints } from "../../constraints/DatabaseConstraints";
import Utils from "../../utils/Utils";
import QuizSearchCriteria from "../../entites/QuizSearchCriteria";
import { firestore } from "firebase-admin";
import QuestionEntity from "../../entites/QuestionEntity";

export default class QuizRepositoryImpl implements QuizRepository {

    getNewPrimaryKey(): string {
        const quizRef = db.collection(DatabaseConstraints.ROOT_QUIZ_COLLECTION_NAME).doc();
        return quizRef.id;
    }

    async getAll(): Promise<QuizEntity[]> {

        let quizRef: firestore.Query<firestore.DocumentData> = db.collection(DatabaseConstraints.ROOT_QUIZ_COLLECTION_NAME);
        console.log("Getting all quizs");

        const quizEntities: QuizEntity[] = [];
        await quizRef.get().then((dailySummarySnapshots) => {
            dailySummarySnapshots.forEach(function (snapshot) {
                var data = snapshot.data() as QuizEntity;
                if (!Utils.isEmpty(data)) {
                    data.id = snapshot.id;
                    quizEntities.push(data);
                }
            });
        });
        console.log("Found : " + quizEntities.length + " quizs.");

        return quizEntities;
    }

    async getOne(id: string): Promise<QuizEntity | null> {

        const quizRef = db.collection(DatabaseConstraints.ROOT_QUIZ_COLLECTION_NAME).doc(id);
        console.log("Getting document: " + quizRef.path);

        const doc = await quizRef.get();
        if (!doc.exists) {
            console.log('Quiz not found!');
            return null;
        } else {
            const quizEntity: QuizEntity = doc.data() as QuizEntity;
            quizEntity.id = doc.id;
            return quizEntity;
        }
    }

    async searchQuiz(searchCriteria: QuizSearchCriteria): Promise<QuizEntity[]> {


        let quizRef: firestore.Query<firestore.DocumentData> = db.collection(DatabaseConstraints.ROOT_QUIZ_COLLECTION_NAME);
        console.log("Searching quizs with:  " + JSON.stringify(searchCriteria));

        const quizEntities: QuizEntity[] = [];
        if (!Utils.isEmpty(searchCriteria.name)) {
            quizRef = quizRef.where("name", "==", searchCriteria.name);
        }

        //    TODO

        await quizRef.get().then((dailySummarySnapshots) => {
            dailySummarySnapshots.forEach(function (snapshot) {
                var data = snapshot.data() as QuizEntity;
                if (!Utils.isEmpty(data)) {
                    data.id = snapshot.id;
                    quizEntities.push(data);
                }
            });
        });
        console.log("Found : " + quizEntities.length + " quizs.");

        return quizEntities;
    }

    async insert(quizEntity: QuizEntity): Promise<QuizEntity> {

        const quizRef = db.collection(DatabaseConstraints.ROOT_QUIZ_COLLECTION_NAME).doc(quizEntity.id);
        console.log("Setting document: " + quizRef.path);

        return await quizRef.set(quizEntity).then(doc => {
            quizEntity.id = quizRef.id;
            console.log("Successfully created quiz: " + quizEntity.id);
            return quizEntity;
        }).catch((error) => {
            console.log('Error creating new quiz:' + error.message);
            throw error;
        });
    }

    async getQuizAllQuestions(id: string): Promise<QuestionEntity[]> {

        let quizRef: firestore.Query<firestore.DocumentData>
            = db.collection(DatabaseConstraints.ROOT_QUIZ_COLLECTION_NAME)
                .doc(id).collection(DatabaseConstraints.QUIZ_QUESTIONS_COLLECTION_NAME);
        console.log("Getting all questions of quiz : " + id);

        const entities: QuestionEntity[] = [];
        await quizRef.get().then((dailySummarySnapshots) => {
            dailySummarySnapshots.forEach(function (snapshot) {
                var data = snapshot.data() as QuestionEntity;
                if (!Utils.isEmpty(data)) {
                    data.id = snapshot.id;
                    entities.push(data);
                }
            });
        });
        console.log("Found : " + entities.length + " quiz questions.");

        return entities;

    }

    async insertQuestion(entity: QuestionEntity): Promise<QuestionEntity> {

        let quizRef
            = db.collection(DatabaseConstraints.ROOT_QUIZ_COLLECTION_NAME).doc(entity.quizId)
                .collection(DatabaseConstraints.QUIZ_QUESTIONS_COLLECTION_NAME).doc(entity.id);

        console.log("Setting document: " + quizRef.path);

        return await quizRef.set(entity).then(doc => {
            entity.id = quizRef.id;
            console.log("Successfully created quiz: " + entity.id);
            return entity;
        }).catch((error) => {
            console.log('Error creating new quiz:' + error.message);
            throw error;
        });
    }

    async getQuizOneQuestion(quizId: string, id: string): Promise<QuestionEntity | null>{

        const quizQuestionRef = db.collection(DatabaseConstraints.ROOT_QUIZ_COLLECTION_NAME).doc(quizId)
        .collection(DatabaseConstraints.QUIZ_QUESTIONS_COLLECTION_NAME).doc(id);
        console.log("Getting document: " + quizQuestionRef.path);

        const doc = await quizQuestionRef.get();
        if (!doc.exists) {
            console.log('Quiz question not found!');
            return null;
        } else {
            const quizQuestionEntity: QuestionEntity = doc.data() as QuestionEntity;
            quizQuestionEntity.id = doc.id;
            return quizQuestionEntity;
        }
    }
}
