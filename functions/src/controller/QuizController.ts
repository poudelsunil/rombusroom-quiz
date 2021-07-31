import GetQuizByIdControllerRequest from "../dto/quiz/GetQuizByIdControllerRequest";
import QuizInfo from "../dto/quiz/QuizInfo";
import CreateQuizControllerRequest from "../dto/quiz/CreateQuizControllerRequest";
import CreateQuizControllerResponse from "../dto/quiz/CreateQuizControllerResponse";

export default interface QuizController {

    getAll(): Promise<QuizInfo[]>;
    
    getById(request: GetQuizByIdControllerRequest): Promise<QuizInfo>;

    add(request: CreateQuizControllerRequest): Promise<CreateQuizControllerResponse>;
}