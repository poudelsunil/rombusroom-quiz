import GetQuizSessionByIdControllerRequest from "../dto/quizsession/GetQuizSessionByIdControllerRequest";
import QuizSessionInfo from "../dto/quizsession/QuizSessionInfo";
import CreateQuizSessionControllerRequest from "../dto/quizsession/CreateQuizSessionControllerRequest";
import CreateQuizSessionControllerResponse from "../dto/quizsession/CreateQuizSessionControllerResponse";
import UpdateQuizSessionStatusControllerResponse from "../dto/quizsession/UpdateQuizSessionStatusControllerResponse";
import UpdateQuizSessionStatusControllerRequest from "../dto/quizsession/UpdateQuizSessionStatusControllerRequest";
import AddQuizSessionMemberControllerRequest from "../dto/quizsession/AddQuizSessionMemberControllerRequest";
import AddQuizSessionMemberControllerResponse from "../dto/quizsession/AddQuizSessionMemberControllerResponse";
import AddQuizSessionMemberScoreControllerRequest from "../dto/quizsession/AddQuizSessionMemberScoreControllerRequest";
import AddQuizSessionMemberScoreControllerResponse from "../dto/quizsession/AddQuizSessionMemberScoreControllerResponse";

export default interface QuizSessionController {

    getAll(): Promise<QuizSessionInfo[]>;

    getById(request: GetQuizSessionByIdControllerRequest): Promise<QuizSessionInfo>;

    add(request: CreateQuizSessionControllerRequest): Promise<CreateQuizSessionControllerResponse>;

    updateStatus(request: UpdateQuizSessionStatusControllerRequest): Promise<UpdateQuizSessionStatusControllerResponse>;

    addMember(request: AddQuizSessionMemberControllerRequest): Promise<AddQuizSessionMemberControllerResponse>;

    addMemberScore(request: AddQuizSessionMemberScoreControllerRequest): Promise<AddQuizSessionMemberScoreControllerResponse>;
}