import QuizEntity from "../entites/QuizEntity";
import QuizSearchCriteria from "../entites/QuizSearchCriteria";

export default interface QuizRepository {

    getNewPrimaryKey(): string;
    getAll(): Promise<QuizEntity[]>;
    getOne(id: string): Promise<QuizEntity | null>;
    searchQuiz(searchCriteria: QuizSearchCriteria): Promise<QuizEntity[]> 
    insert(userEntity: QuizEntity): Promise<QuizEntity>;
}