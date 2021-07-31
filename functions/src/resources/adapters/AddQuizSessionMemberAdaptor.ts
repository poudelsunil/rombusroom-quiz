import RequestAdaptor from "../../utils/RequestAdaptor";
import AddQuizSessionMemberControllerRequest from "../../dto/quizsession/AddQuizSessionMemberControllerRequest";

export default class AddQuizSessionMemberAdaptor implements RequestAdaptor<AddQuizSessionMemberControllerRequest>{

    toServiceObject(jsonObject: any):AddQuizSessionMemberControllerRequest {
        const request: AddQuizSessionMemberControllerRequest = new AddQuizSessionMemberControllerRequest();

        // TODO
        
        return request;
    }
}