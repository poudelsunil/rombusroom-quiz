import RequestAdaptor from "../../utils/RequestAdaptor";
import CreateQuizSessionControllerRequest from "../../dto/quizsession/CreateQuizSessionControllerRequest";

export default class CreateQuizSessionAdaptor implements RequestAdaptor<CreateQuizSessionControllerRequest>{

    toServiceObject(jsonObject: any):CreateQuizSessionControllerRequest {
        const request: CreateQuizSessionControllerRequest = new CreateQuizSessionControllerRequest();

        request.name  = jsonObject.name;

        // TODO
        
        return request;
    }
}