export default class GetQuizByIdControllerRequest {

    quizId?: string;

    constructor(id:string){
        this.quizId = id;
    }
}