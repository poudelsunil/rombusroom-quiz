import Utils from "../utils/Utils";
import GetQuizSessionByIdControllerRequest from "../dto/quizsession/GetQuizSessionByIdControllerRequest";
import QuizSessionController from "../controller/QuizSessionController";
import QuizSessionControllerImpl from "../controller/impl/QuizSessionControllerImpl";
import QuizSessionInfo from "../dto/quizsession/QuizSessionInfo";
import CreateQuizSessionAdaptor from "./adapters/CreateQuizSessionAdaptor";
import CreateQuizSessionControllerRequest from "../dto/quizsession/CreateQuizSessionControllerRequest";
import CreateQuizSessionControllerResponse from "../dto/quizsession/CreateQuizSessionControllerResponse";

import QuizSessionRepository from "../repositories/QuizSessionRepository";
import QuizSessionRepositoryImpl from "../repositories/impl/QuizSessionRepositoryImpl";
import UpdateQuizSessionStatusControllerRequest from "../dto/quizsession/UpdateQuizSessionStatusControllerRequest";
import UpdateQuizSessionStatusAdaptor from "./adapters/UpdateQuizSessionStatusAdaptor";
import UpdateQuizSessionStatusControllerResponse from "../dto/quizsession/UpdateQuizSessionStatusControllerResponse";
import AddQuizSessionMemberControllerRequest from "../dto/quizsession/AddQuizSessionMemberControllerRequest";
import AddQuizSessionMemberControllerResponse from "../dto/quizsession/AddQuizSessionMemberControllerResponse";
import AddQuizSessionMemberAdaptor from "./adapters/AddQuizSessionMemberAdaptor";
import AddQuizSessionMemberScoreControllerRequest from "../dto/quizsession/AddQuizSessionMemberScoreControllerRequest";
import AddQuizSessionMemberScoreControllerResponse from "../dto/quizsession/AddQuizSessionMemberScoreControllerResponse";
import AddQuizSessionMemberScoreAdaptor from "./adapters/AddQuizSessionMemberScoreAdaptor";
const quizSessionRepository: QuizSessionRepository = new QuizSessionRepositoryImpl();
const quizSessionController: QuizSessionController = new QuizSessionControllerImpl(quizSessionRepository);
const createQuizSessionAdaptor: CreateQuizSessionAdaptor = new CreateQuizSessionAdaptor();

const updateQuizSessionStatusAdaptor: UpdateQuizSessionStatusAdaptor = new UpdateQuizSessionStatusAdaptor();
const addQuizSessionMemberAdaptor : AddQuizSessionMemberAdaptor = new AddQuizSessionMemberAdaptor();
const addQuizSessionMemberScoreAdaptor : AddQuizSessionMemberScoreAdaptor = new AddQuizSessionMemberScoreAdaptor();

export async function getAllQuizSession(req : any, res : any) {

    console.log("Getting all quiz session");

    quizSessionController.getAll().then((quizSession: QuizSessionInfo[]) => {
        return res.status(200).send(quizSession);
    }).catch((e: any) => {

        return Utils.prepareHttpErrorResponse(res, e);
    });

}

export async function getQuizSessionById(req : any, res : any) {

    console.log("Getting quiz session");

    const request: GetQuizSessionByIdControllerRequest = new GetQuizSessionByIdControllerRequest(req.params.id);
    console.log("GetQuizSessionByIdControllerRequest : " + JSON.stringify(request));

    quizSessionController.getById(request).then((quizSession: QuizSessionInfo) => {
        return res.status(200).send(quizSession);
    }).catch((e: any) => {

        return Utils.prepareHttpErrorResponse(res, e);
    });

}

export async function createQuizSession(req : any, res : any) {

    console.log("Creating quiz session");

    const createQuizSessionControllerRequest: CreateQuizSessionControllerRequest 
    = createQuizSessionAdaptor.toServiceObject(req.body);
    console.log("CreateQuizSessionControllerRequest : " + JSON.stringify(createQuizSessionControllerRequest));

    quizSessionController.add(createQuizSessionControllerRequest)
    .then((quizSession: CreateQuizSessionControllerResponse) => {
        return res.status(200).send(quizSession);
    }).catch((e: any) => {
        return Utils.prepareHttpErrorResponse(res, e);
    });

}

export async function updateQuizSessionStatus(req : any, res : any) {

    console.log("Updating quiz session status");

    const request: UpdateQuizSessionStatusControllerRequest
    = updateQuizSessionStatusAdaptor.toServiceObject(req.body);
    request.id = req.params.id;

    console.log("UpdateQuizSessionStatusControllerRequest : " + JSON.stringify(request));

    quizSessionController.updateStatus(request)
    .then((quizSession: UpdateQuizSessionStatusControllerResponse) => {
        return res.status(200).send(quizSession);
    }).catch((e: any) => {
        return Utils.prepareHttpErrorResponse(res, e);
    });
}

export async function addQuizSessionMember(req : any, res : any) {

    console.log("Adding member to quiz session");

    const request: AddQuizSessionMemberControllerRequest 
     = addQuizSessionMemberAdaptor.toServiceObject(req.body);
    request.id = req.params.id;

    console.log("AddQuizSessionMemberControllerRequest : " + JSON.stringify(request));

    quizSessionController.addMember(request)
    .then((quizSession: AddQuizSessionMemberControllerResponse) => {
        return res.status(200).send(quizSession);
    }).catch((e: any) => {
        return Utils.prepareHttpErrorResponse(res, e);
    });
}

export async function addQuizSessionMemberScrore(req : any, res : any) {

    console.log("Adding member score to quiz session");

    const request: AddQuizSessionMemberScoreControllerRequest 
     = addQuizSessionMemberScoreAdaptor.toServiceObject(req.body);
    request.id = req.params.id;
    request.memberId = req.params.memberId;

    console.log("AddQuizSessionMemberScoreControllerRequest : " + JSON.stringify(request));

    quizSessionController.addMemberScore(request)
    .then((quizSession: AddQuizSessionMemberScoreControllerResponse) => {
        return res.status(200).send(quizSession);
    }).catch((e: any) => {
        return Utils.prepareHttpErrorResponse(res, e);
    });
}

