import RequestAdaptor from "../../utils/RequestAdaptor";
import AddQuizSessionMemberScoreControllerRequest from "../../dto/quizsession/AddQuizSessionMemberScoreControllerRequest";

export default class AddQuizSessionMemberScoreAdaptor implements RequestAdaptor<AddQuizSessionMemberScoreControllerRequest>{

    toServiceObject(jsonObject: any):AddQuizSessionMemberScoreControllerRequest {
        const request: AddQuizSessionMemberScoreControllerRequest = new AddQuizSessionMemberScoreControllerRequest();

        request.memberId = jsonObject.memberId;
        // request.score = jsonObject.score;
        // TODO
        
        return request;
    }
}