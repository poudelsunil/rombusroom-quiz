import Utils from "../utils/Utils";
import GetQuizByIdControllerRequest from "../dto/quiz/GetQuizByIdControllerRequest";
import QuizController from "../controller/QuizController";
import QuizControllerImpl from "../controller/impl/QuizControllerImpl";
import QuizInfo from "../dto/quiz/QuizInfo";
import CreateQuizAdaptor from "./adapters/CreateQuizAdaptor";
import CreateQuizControllerRequest from "../dto/quiz/CreateQuizControllerRequest";
import CreateQuizControllerResponse from "../dto/quiz/CreateQuizControllerResponse";

import QuizRepository from "../repositories/QuizRepository";
import QuizRepositoryImpl from "../repositories/impl/QuizRepositoryImpl";
const quizRepository: QuizRepository = new QuizRepositoryImpl();
const quizController: QuizController = new QuizControllerImpl(quizRepository);
const createQuizAdaptor: CreateQuizAdaptor = new CreateQuizAdaptor();
const createQuizController: QuizController = new QuizControllerImpl(quizRepository);


export async function getAllQuiz(req : any, res : any) {

    console.log("Getting all quiz");

    quizController.getAll().then((quiz: QuizInfo[]) => {
        return res.status(200).send(quiz);
    }).catch((e: any) => {

        return Utils.prepareHttpErrorResponse(res, e);
    });

}

export async function getQuizById(req : any, res : any) {

    console.log("Getting quiz");

    const request: GetQuizByIdControllerRequest = new GetQuizByIdControllerRequest(req.params.id);
    console.log("GetQuizByIdControllerRequest : " + JSON.stringify(request));

    quizController.getById(request).then((quiz: QuizInfo) => {
        return res.status(200).send(quiz);
    }).catch((e: any) => {

        return Utils.prepareHttpErrorResponse(res, e);
    });

}

export async function createQuiz(req : any, res : any) {

    console.log("Creating quiz");

    const createQuizControllerRequest: CreateQuizControllerRequest = createQuizAdaptor.toServiceObject(req.body);
    console.log("CreateQuizControllerRequest : " + JSON.stringify(createQuizControllerRequest));

    createQuizController.add(createQuizControllerRequest).then((quiz: CreateQuizControllerResponse) => {
        return res.status(200).send(quiz);
    }).catch((e: any) => {
        return Utils.prepareHttpErrorResponse(res, e);
    });

}