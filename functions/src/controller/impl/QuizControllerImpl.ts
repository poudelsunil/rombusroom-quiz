import QuizController from "../QuizController";
import QuizRepository from "../../repositories/QuizRepository";
import QuizEntity from "../../entites/QuizEntity";
import Utils from "../../utils/Utils";
import GetQuizByIdControllerRequest from "../../dto/quiz/GetQuizByIdControllerRequest";
import ValidationError from "../../utils/ValidationError";
import QuizInfo from "../../dto/quiz/QuizInfo";
import CreateQuizControllerRequest from "../../dto/quiz/CreateQuizControllerRequest";
import CreateQuizControllerResponse from "../../dto/quiz/CreateQuizControllerResponse";

export default class QuizControllerImpl implements QuizController {

    quizRepository: QuizRepository;
    constructor(quizRepository: QuizRepository) {
        this.quizRepository = quizRepository;
    }

    async getAll(): Promise<QuizInfo[]>{

        const quizEntities: QuizEntity[]
            = await this.quizRepository.getAll();

        return quizEntities.map(this.toQuizInfo);

    }

    async getById(request: GetQuizByIdControllerRequest): Promise<QuizInfo> {

        if (Utils.isEmpty(request.quizId) || !request.quizId) {
            throw new ValidationError("QuizId should not be empty or null");
        }

        const quizEntity: QuizEntity | null
            = await this.quizRepository.getOne(request.quizId);

        if (quizEntity === null) {
            console.log("Quiz Not Found");
            throw new ValidationError("Quiz not found");
        }

        return this.toQuizInfo(quizEntity);
    }

    toQuizInfo(quizEntity: QuizEntity): QuizInfo {
        return quizEntity;
    }


    async add(request: CreateQuizControllerRequest): Promise<CreateQuizControllerResponse> {

        await this.validateCreateQuizControllerRequest(request);


        const quizEntity: QuizEntity = this.prepareQuizEntity(request);
        const createdQuizEntity: QuizEntity | null
            = await this.quizRepository.insert(quizEntity);
        return {
            id: createdQuizEntity.id,
            name: createdQuizEntity.name

            // TODO
        }
    }

    prepareQuizEntity(request: CreateQuizControllerRequest): QuizEntity {

        return {
            id: this.quizRepository.getNewPrimaryKey(),
            name: request.name || ""

            // TODO
        };

    }


    async validateCreateQuizControllerRequest(request: CreateQuizControllerRequest) {

        if (!request || !request.name || Utils.isEmpty(request.name)) {
            throw new ValidationError("Name is missing");
        }

        // TODO

        await this.duplicateValidation(request);
    }

    async duplicateValidation(request: CreateQuizControllerRequest) {

        const quizEntities: QuizEntity[]
            = await this.quizRepository.searchQuiz({ name: request.name });

        if (quizEntities && quizEntities.length >= 1) {
            throw new ValidationError("Quiz with name " + request.name + " already exist");
        }

    }

}
