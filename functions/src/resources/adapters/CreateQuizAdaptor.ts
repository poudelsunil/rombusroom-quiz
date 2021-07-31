import RequestAdaptor from "../../utils/RequestAdaptor";
import CreateQuizControllerRequest from "../../dto/quiz/CreateQuizControllerRequest";

export default class CreateQuizAdaptor implements RequestAdaptor<CreateQuizControllerRequest>{

    toServiceObject(jsonObject: any):CreateQuizControllerRequest {
        const request: CreateQuizControllerRequest = new CreateQuizControllerRequest();

        request.name  = jsonObject.name;

        // TODO
        
        return request;
    }
}