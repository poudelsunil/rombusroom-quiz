export default class UserEntity {

    id: string;
    name: string;
    email?: string;
    googleSSOId?: string;

    constructor(
        id: string, name: string, email?: string, googleSSOId?: string
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.googleSSOId = googleSSOId;
    }
}