export default class QuizEntity {

    id: string;
    name: string;
    description: string;
    createdBy: string;
    createdAt: number;

    constructor(
        id: string,
        name: string,
        description: string,
        
        createdBy: string,
        createdAt: number
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        
        this.createdBy = createdBy;
        this.createdAt = createdAt;
    }

}