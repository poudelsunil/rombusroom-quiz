import QuizSessionController from "../QuizSessionController";
import QuizSessionRepository from "../../repositories/QuizSessionRepository";
import QuizSessionEntity from "../../entites/QuizSessionEntity";
import Utils from "../../utils/Utils";
import GetQuizSessionByIdControllerRequest from "../../dto/quizsession/GetQuizSessionByIdControllerRequest";
import ValidationError from "../../utils/ValidationError";
import QuizSessionInfo from "../../dto/quizsession/QuizSessionInfo";
import CreateQuizSessionControllerRequest from "../../dto/quizsession/CreateQuizSessionControllerRequest";
import CreateQuizSessionControllerResponse from "../../dto/quizsession/CreateQuizSessionControllerResponse";
import UpdateQuizSessionStatusControllerRequest from "../../dto/quizsession/UpdateQuizSessionStatusControllerRequest";
import UpdateQuizSessionStatusControllerResponse from "../../dto/quizsession/UpdateQuizSessionStatusControllerResponse";
import AddQuizSessionMemberControllerRequest from "../../dto/quizsession/AddQuizSessionMemberControllerRequest";
import AddQuizSessionMemberControllerResponse from "../../dto/quizsession/AddQuizSessionMemberControllerResponse";
import AddQuizSessionMemberScoreControllerRequest from "../../dto/quizsession/AddQuizSessionMemberScoreControllerRequest";
import AddQuizSessionMemberScoreControllerResponse from "../../dto/quizsession/AddQuizSessionMemberScoreControllerResponse";

export default class QuizSessionControllerImpl implements QuizSessionController {

    quizSessionRepository: QuizSessionRepository;
    constructor(quizSessionRepository: QuizSessionRepository) {
        this.quizSessionRepository = quizSessionRepository;
    }

    async getAll(): Promise<QuizSessionInfo[]> {

        const quizSessionEntities: QuizSessionEntity[]
            = await this.quizSessionRepository.getAll();

        return quizSessionEntities.map(this.toQuizSessionInfo);

    }

    async getById(request: GetQuizSessionByIdControllerRequest): Promise<QuizSessionInfo> {

        if (Utils.isEmpty(request.quizSessionId) || !request.quizSessionId) {
            throw new ValidationError("QuizSessionId should not be empty or null");
        }

        const quizSessionEntity: QuizSessionEntity | null
            = await this.quizSessionRepository.getOne(request.quizSessionId);

        if (quizSessionEntity === null) {
            console.log("QuizSession Not Found");
            throw new ValidationError("QuizSession not found");
        }

        return this.toQuizSessionInfo(quizSessionEntity);
    }

    toQuizSessionInfo(quizSessionEntity: QuizSessionEntity): QuizSessionInfo {
        return quizSessionEntity;
    }


    async add(request: CreateQuizSessionControllerRequest): Promise<CreateQuizSessionControllerResponse> {

        await this.validateCreateQuizSessionControllerRequest(request);


        const quizSessionEntity: QuizSessionEntity = this.prepareQuizSessionEntity(request);
        const createdQuizSessionEntity: QuizSessionEntity | null
            = await this.quizSessionRepository.insert(quizSessionEntity);
        return {
            id: createdQuizSessionEntity.id,
            name: createdQuizSessionEntity.name

            // TODO
        }
    }

    prepareQuizSessionEntity(request: CreateQuizSessionControllerRequest): QuizSessionEntity {

        return {
            id: this.quizSessionRepository.getNewPrimaryKey(),
            name: request.name || ""

            // TODO
        };

    }


    async validateCreateQuizSessionControllerRequest(request: CreateQuizSessionControllerRequest) {

        if (!request || !request.name || Utils.isEmpty(request.name)) {
            throw new ValidationError("Name is missing");
        }

        // TODO

        await this.duplicateValidation(request);
    }

    async duplicateValidation(request: CreateQuizSessionControllerRequest) {

        const quizSessionEntities: QuizSessionEntity[]
            = await this.quizSessionRepository.searchQuizSession({ name: request.name });

        if (quizSessionEntities && quizSessionEntities.length >= 1) {
            throw new ValidationError("QuizSession with name " + request.name + " already exist");
        }

    }

    async updateStatus(request: UpdateQuizSessionStatusControllerRequest): Promise<UpdateQuizSessionStatusControllerResponse> {

        await this.validateUpdateQuizSessionStatusControllerRequest(request);

        const fieldsToUpdate: any = this.prepareQuizSessionToUpdate(request);
        this.quizSessionRepository.update(request.id || "", fieldsToUpdate);
        return { id: request.id, status: request.status };
    }

    prepareQuizSessionToUpdate(request: UpdateQuizSessionStatusControllerRequest): any {
        return { status: request.status };
    }

    async validateUpdateQuizSessionStatusControllerRequest(request: UpdateQuizSessionStatusControllerRequest) {


        if (!request || !request.id || Utils.isEmpty(request.id)) {
            throw new ValidationError("Id is missing");
        }

        if (!request || !request.status || Utils.isEmpty(request.status)) {
            throw new ValidationError("Status is missing");
        }

        const quizSessionEntity: QuizSessionEntity = await this.validateAndGetQuizSession(request.id);

        this.validateDbRecordForStatusUpdate(quizSessionEntity, request);

    }

    async validateAndGetQuizSession(id: string): Promise<QuizSessionEntity> {

        const entity: QuizSessionEntity | null = await this.quizSessionRepository.getOne(id);
        if (!entity || entity == null) {
            throw new ValidationError("Quiz session record not found");
        }

        return entity;
    }

    validateDbRecordForStatusUpdate(quizSessionEntity: QuizSessionEntity, request: UpdateQuizSessionStatusControllerRequest) {

        // TODO
    }


    async addMember(request: AddQuizSessionMemberControllerRequest): Promise<AddQuizSessionMemberControllerResponse>{


        await this.validateAddQuizSessionMemberControllerRequest(request);

        // TODO
        
        return {id:"RANDOM"};
    }

    async validateAddQuizSessionMemberControllerRequest(request: AddQuizSessionMemberControllerRequest){

        if (!request || !request.id || Utils.isEmpty(request.id)) {
            throw new ValidationError("Quiz Session Id is missing");
        }

        const quizSessionEntity: QuizSessionEntity = await this.validateAndGetQuizSession(request.id);

        this.validateDbRecordForMemberAdd(quizSessionEntity, request);

    }

    validateDbRecordForMemberAdd(quizSessionEntity: QuizSessionEntity, request: AddQuizSessionMemberControllerRequest) {

        // TODO
    }

    async addMemberScore(request: AddQuizSessionMemberScoreControllerRequest)
    : Promise<AddQuizSessionMemberScoreControllerResponse>{

        // const quizSessionEntity: QuizSessionEntity = 
        await this.validateAddQuizSessionMemberScoreControllerRequest(request);

        // TODO
        // const member: any /*MemberEntity*/ = this.prepareQuizSessionMember(quizSessionEntity, request);
        // this.quizSessionRepository.addMemberScore(request.id, request.memberId, member)

        return {};

    }

    prepareQuizSessionMember(quizSessionEntity: QuizSessionEntity, 
        request: AddQuizSessionMemberScoreControllerRequest):any{

            return {};
            // todo

    }

    async validateAddQuizSessionMemberScoreControllerRequest(request: AddQuizSessionMemberScoreControllerRequest)
    : Promise<QuizSessionEntity>{

        if (!request || !request.id || Utils.isEmpty(request.id)) {
            throw new ValidationError("Quiz Session Id is missing");
        }

        if (!request || !request.memberId || Utils.isEmpty(request.memberId)) {
            throw new ValidationError("Member id is missing");
        }

        const quizSessionEntity: QuizSessionEntity = await this.validateAndGetQuizSession(request.id);

        // const userEntity: UserEntity = await this.validateAndGetUser(request.memberId);


    
        return quizSessionEntity;
    }


    // async validateAndUser(id: string): Promise<UserEntity> {

    //     const entity: UserEntity | null = await this.userRepository.getOne(id);
    //     if (!entity || entity == null) {
    //         throw new ValidationError("User record not found");
    //     }

    //     return entity;
    // }

}
