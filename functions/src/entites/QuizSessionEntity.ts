export default class UserEntity {

    id: string;
    name: string;
    status?: string;

    // TODO
    

    constructor(
        id: string, name: string
    ) {
        this.id = id;
        this.name = name;
    }
}