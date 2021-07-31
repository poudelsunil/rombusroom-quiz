import RequestAdaptor from "../../utils/RequestAdaptor";
import CreateUserControllerRequest from "../../dto/users/CreateUserControllerRequest";

export default class CreateUserAdaptor implements RequestAdaptor<CreateUserControllerRequest>{

    toServiceObject(jsonObject: any):CreateUserControllerRequest {
        const request: CreateUserControllerRequest = new CreateUserControllerRequest();

        request.name  = jsonObject.name;
        request.emailAddress  = jsonObject.emailAddress;
        request.googleSSOId  = jsonObject.googleSSOId;
        
        return request;
    }
}