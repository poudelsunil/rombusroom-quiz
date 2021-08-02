import QuestionEntity from "../entites/QuestionEntity";
import QuizEntity from "../entites/QuizEntity";
import QuizSearchCriteria from "../entites/QuizSearchCriteria";

export default interface QuizRepository {

    getNewPrimaryKey(): string;
    getAll(): Promise<QuizEntity[]>;
    getOne(id: string): Promise<QuizEntity | null>;
    searchQuiz(searchCriteria: QuizSearchCriteria): Promise<QuizEntity[]> 
    insert(entity: QuizEntity): Promise<QuizEntity>;

    getQuizAllQuestions(quizId: string):  Promise<QuestionEntity[]>;
    getQuizOneQuestion(quizId: string, id: string): Promise<QuestionEntity | null>;
    insertQuestion(entity: QuestionEntity): Promise<QuestionEntity>;
}