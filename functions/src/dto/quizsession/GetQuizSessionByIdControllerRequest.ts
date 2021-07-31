export default class GetQuizSessionByIdControllerRequest {

    quizSessionId?: string;

    constructor(id:string){
        this.quizSessionId = id;
    }
}