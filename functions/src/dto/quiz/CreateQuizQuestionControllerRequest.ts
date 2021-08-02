export default class CreateQuizQuestionControllerRequest {

    quizId?: string;
    title?: string ;
    description?: string ;
    image?: string ;
    videoUrl?: string ;
    audioUrl?: string ;
    options?: string[] ;
    answerIndex?: number ;

    createdBy?: string;
}