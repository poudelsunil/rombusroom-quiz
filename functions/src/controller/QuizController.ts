import GetQuizByIdControllerRequest from "../dto/quiz/GetQuizByIdControllerRequest";
import QuizInfo from "../dto/quiz/QuizInfo";
import CreateQuizControllerRequest from "../dto/quiz/CreateQuizControllerRequest";
import CreateQuizControllerResponse from "../dto/quiz/CreateQuizControllerResponse";
import CreateQuizQuestionControllerRequest from "../dto/quiz/CreateQuizQuestionControllerRequest";
import QuestionInfo from "../dto/quiz/QuestionInfo";

export default interface QuizController {

    getAll(): Promise<QuizInfo[]>;
    
    getById(request: GetQuizByIdControllerRequest): Promise<QuizInfo>;

    add(request: CreateQuizControllerRequest): Promise<CreateQuizControllerResponse>;

    getAllQuizQuestions(quizId ?: string): Promise<QuestionInfo[]>;
    getQuizQuestionById(quizId ?: string, id ?: string): Promise<QuestionInfo>;
    addQuizQuestion(request : CreateQuizQuestionControllerRequest): Promise<QuestionInfo>;
}