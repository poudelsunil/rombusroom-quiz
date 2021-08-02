import QuizController from "../QuizController";
import QuizRepository from "../../repositories/QuizRepository";
import QuizEntity from "../../entites/QuizEntity";
import Utils from "../../utils/Utils";
import GetQuizByIdControllerRequest from "../../dto/quiz/GetQuizByIdControllerRequest";
import ValidationError from "../../utils/ValidationError";
import QuizInfo from "../../dto/quiz/QuizInfo";
import CreateQuizControllerRequest from "../../dto/quiz/CreateQuizControllerRequest";
import CreateQuizControllerResponse from "../../dto/quiz/CreateQuizControllerResponse";
import QuestionInfo from "../../dto/quiz/QuestionInfo";
import QuestionEntity from "../../entites/QuestionEntity";
import CreateQuizQuestionControllerRequest from "../../dto/quiz/CreateQuizQuestionControllerRequest";

export default class QuizControllerImpl implements QuizController {

    quizRepository: QuizRepository;
    constructor(quizRepository: QuizRepository) {
        this.quizRepository = quizRepository;
    }

    async getAll(): Promise<QuizInfo[]> {

        const quizEntities: QuizEntity[]
            = await this.quizRepository.getAll();

        return quizEntities.map(this.toQuizInfo);

    }

    async getById(request: GetQuizByIdControllerRequest): Promise<QuizInfo> {

        if (Utils.isEmpty(request.quizId) || !request.quizId) {
            throw new ValidationError("QuizId is missing.");
        }

        const quizEntity: QuizEntity = await this.validateAndGetQuiz(request.quizId);

        const questions: QuestionEntity[]
            = await this.quizRepository.getQuizAllQuestions(request.quizId);

        const quizInfo: QuizInfo = this.toQuizInfo(quizEntity);
        quizInfo.questions = questions && questions.length > 0 ? questions.map(this.toQuestionInfo) : [];

        return quizInfo;
    }

    toQuizInfo(quizEntity: QuizEntity): QuizInfo {
        return {
            id: quizEntity.id,
            name: quizEntity.name,
            description: quizEntity.description,
            createdBy: quizEntity.createdBy,
            createdAt: quizEntity.createdAt,
            // questions: quizEntity.questions?.map(this.toQuestionInfo)
        }
    }

    toQuestionInfo(questionEntity: QuestionEntity): QuestionInfo {
        return {
            id: questionEntity.id,
            quizId: questionEntity.quizId,
            title: questionEntity.title,
            description: questionEntity.description,
            image: questionEntity.image,
            videoUrl: questionEntity.videoUrl,
            audioUrl: questionEntity.audioUrl,
            options: questionEntity.options,
            answerIndex: questionEntity.answerIndex
        }
    }

    async add(request: CreateQuizControllerRequest): Promise<CreateQuizControllerResponse> {

        await this.validateCreateQuizControllerRequest(request);


        const quizEntity: QuizEntity = this.prepareQuizEntity(request);
        const createdQuizEntity: QuizEntity | null
            = await this.quizRepository.insert(quizEntity);
        return {
            id: createdQuizEntity.id,
            name: createdQuizEntity.name,
            description: createdQuizEntity.description

        }
    }

    prepareQuizEntity(request: CreateQuizControllerRequest): QuizEntity {

        return {
            id: this.quizRepository.getNewPrimaryKey(),
            name: request.name || "",
            description: request.description || "",

            createdBy: request.createdBy || "",
            createdAt: new Date().getTime()
        };
    }


    async validateCreateQuizControllerRequest(request: CreateQuizControllerRequest) {

        if (!request || !request.name || Utils.isEmpty(request.name)) {
            throw new ValidationError("Quiz name is missing");
        }

        // await this.duplicateValidation(request);
    }

    // async duplicateValidation(request: CreateQuizControllerRequest) {

    //     const quizEntities: QuizEntity[]
    //         = await this.quizRepository.searchQuiz({ name: request.name });

    //     if (quizEntities && quizEntities.length >= 1) {
    //         throw new ValidationError("Quiz with name " + request.name + " already exist");
    //     }
    // }


    async addQuizQuestion(request: CreateQuizQuestionControllerRequest): Promise<QuestionInfo> {

        await this.validateCreateQuizQuestionControllerRequest(request);
        await this.validateAndGetQuiz(request.quizId || "");

        const questionEntity: QuestionEntity = this.prepareQuizQuestionEntity(request);
        const createdQuizEntity: QuestionEntity
            = await this.quizRepository.insertQuestion(questionEntity);

        return this.toQuestionInfo(createdQuizEntity);

    }

    prepareQuizQuestionEntity(request: CreateQuizQuestionControllerRequest): QuestionEntity {

        return {
            id: this.quizRepository.getNewPrimaryKey(),
            quizId: request.quizId || "",

            title: request.title || "",
            description: request.description || "",
            image: request.image || "",
            videoUrl: request.videoUrl || "",
            audioUrl: request.audioUrl || "",
            options: request.options || [],
            answerIndex: request.answerIndex || 99999,

            createdBy: request.createdBy || "",
            createdAt: new Date().getTime()
        };
    }


    async validateCreateQuizQuestionControllerRequest(request: CreateQuizQuestionControllerRequest) {

        if (!request || !request.quizId || Utils.isEmpty(request.quizId)) {
            throw new ValidationError("QuizId is missing");
        }

        if (!request || Utils.isEmpty(request.title)) {
            throw new ValidationError("Question title is missing");
        }

        // if (!request || Utils.isEmpty(request.description)) {
        //     throw new ValidationError("Question description is missing");
        // }

        if (!request || Utils.isEmpty(request.options) || !request.options
            || (Array.isArray(request.options) && request.options.length <= 0)) {
            throw new ValidationError("Answer options are missing");
        }

        if (!request || !Array.isArray(request.options)) {
            throw new ValidationError("Answer options should be array");
        }

        if(!request || Utils.isEmpty(request.answerIndex)
        || Utils.isEmptyUndefinedNullOrInvalidNumber(request.answerIndex)
        || request.answerIndex === undefined){
            throw new ValidationError("Answer answer index is missing");
        }

        if (!request || Utils.isEmpty(request.answerIndex)
            || Utils.isEmptyUndefinedNullOrInvalidNumber(request.answerIndex)
            || request.answerIndex === undefined
            || request.answerIndex < 0
            || request.answerIndex >= request.options.length) {
            throw new ValidationError("Answer answer index is invalid");
        }
    }

    async validateAndGetQuiz(quizId: string): Promise<QuizEntity> {

        const quizEntity: QuizEntity | null
            = await this.quizRepository.getOne(quizId);

        if (quizEntity === null) {
            console.log("Quiz with id " + quizId + " not found");
            throw new ValidationError("Quiz with id " + quizId + " not found");
        }
        return quizEntity;
    }


    async getAllQuizQuestions(quizId?: string): Promise<QuestionInfo[]> {

        if (!quizId || Utils.isEmpty(quizId)) {
            throw new ValidationError("Quiz id is missing");
        }

        await this.validateAndGetQuiz(quizId);

        const entities: QuestionEntity[]
            = await this.quizRepository.getQuizAllQuestions(quizId);

        return entities.map(this.toQuestionInfo);
    }

    async getQuizQuestionById(quizId?: string, id?: string): Promise<QuestionInfo> {
        ``

        if (Utils.isEmpty(quizId) || !quizId) {
            throw new ValidationError("QuizId is missing.");
        }

        if (Utils.isEmpty(id) || !id) {
            throw new ValidationError("Question id is missing.");
        }

        await this.validateAndGetQuiz(quizId);

        const questionEntity: QuestionEntity | null
            = await this.quizRepository.getQuizOneQuestion(quizId, id);

        if (!questionEntity) {
            throw new ValidationError("Quiz question not found.");
        }

        return this.toQuestionInfo(questionEntity);

    }
}
