import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import * as UserResource from './resources/UserResource';
import * as QuizResource from './resources/QuizResource';
import * as QuizSessionResource from './resources/QuizSessionResource';

const userApp = express();
const main = express();

main.use(cors());
userApp.use(bodyParser.urlencoded());
userApp.use(bodyParser.json());

main.use('/api/v1', userApp);

userApp.get('/ping', (req: any, res: any) => {
    res.status(200).json("Welcome to cf-rombusroom");
});


userApp.get('/users/:id', UserResource.getUserById);
userApp.post('/users', UserResource.createUser);


userApp.get('/quizzes', QuizResource.getAllQuiz);
userApp.get('/quizzes/:id', QuizResource.getQuizById);
userApp.post('/quizzes', QuizResource.createQuiz);

userApp.get('/quizzes/:quizId/questions', QuizResource.getAllQuizQuestions);
userApp.get('/quizzes/:quizId/questions/:id', QuizResource.getQuizQuestionById);
userApp.post('/quizzes/:quizId/questions', QuizResource.createQuizQuestion);

userApp.get('/quizsession', QuizSessionResource.getAllQuizSession);
userApp.get('/quizsession/:id', QuizSessionResource.getQuizSessionById);
userApp.post('/quizsession', QuizSessionResource.createQuizSession);
userApp.put('/quizsessions/:id/status', QuizSessionResource.updateQuizSessionStatus);
userApp.post('/quizsessions/:id/members', QuizSessionResource.addQuizSessionMember);
userApp.post('/quizsessions/:id/score', QuizSessionResource.addQuizSessionMemberScrore);

    
exports.userapp = functions.region('europe-west3').https.onRequest(main);