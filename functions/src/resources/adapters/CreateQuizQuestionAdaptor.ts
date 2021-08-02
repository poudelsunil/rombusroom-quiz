import RequestAdaptor from "../../utils/RequestAdaptor";
import CreateQuizQuestionControllerRequest from "../../dto/quiz/CreateQuizQuestionControllerRequest";

export default class CreateQuizQuestionAdaptor implements RequestAdaptor<CreateQuizQuestionControllerRequest>{

    toServiceObject(jsonObject: any):CreateQuizQuestionControllerRequest {
        const request: CreateQuizQuestionControllerRequest = new CreateQuizQuestionControllerRequest();

        request.title  = jsonObject.title;
        request.description  = jsonObject.description;
        request.createdBy  = jsonObject.createdBy;
        request.image = jsonObject.image;
        request.videoUrl = jsonObject.videoUrl;
        request.audioUrl = jsonObject.audioUrl;
        request.options = jsonObject.options;
        request.answerIndex = jsonObject.answerIndex;
        request.createdBy = jsonObject.createdBy;

        return request;
    }
}