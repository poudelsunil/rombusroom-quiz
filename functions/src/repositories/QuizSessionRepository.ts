import QuizSessionEntity from "../entites/QuizSessionEntity";
import QuizSessionSearchCriteria from "../entites/QuizSessionSearchCriteria";

export default interface QuizSessionRepository {

    getNewPrimaryKey(): string;
    getAll(): Promise<QuizSessionEntity[]>;
    getOne(id: string): Promise<QuizSessionEntity | null>;
    searchQuizSession(searchCriteria: QuizSessionSearchCriteria): Promise<QuizSessionEntity[]> 
    insert(userEntity: QuizSessionEntity): Promise<QuizSessionEntity>;
    update(id: string, entityToUpdate?: any): Promise<any>;
}