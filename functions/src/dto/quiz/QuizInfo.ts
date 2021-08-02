import QuestionInfo from './QuestionInfo';
export default class QuizInfo {
    id?: string;
    name?: string;
    description?: string;
    createdBy?: string;
    createdAt?: number;
    questions?: QuestionInfo[];
}