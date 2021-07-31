import RequestAdaptor from "../../utils/RequestAdaptor";
import UpdateQuizSessionStatusControllerRequest from "../../dto/quizsession/UpdateQuizSessionStatusControllerRequest";

export default class UpdateQuizSessionStatusAdaptor implements RequestAdaptor<UpdateQuizSessionStatusControllerRequest>{

    toServiceObject(jsonObject: any):UpdateQuizSessionStatusControllerRequest {
        const request: UpdateQuizSessionStatusControllerRequest = new UpdateQuizSessionStatusControllerRequest();

        request.status  = jsonObject.status;

        // TODO
        
        return request;
    }
}