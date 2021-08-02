export default class QuestionInfo{
    
    id?: string | null;
    quizId?: string | null;
    title?: string | null;
    description?: string | null;
    image?: string | null;
    videoUrl?: string | null;
    audioUrl?: string | null;
    options?: string[] | null;
    answerIndex?: number | null;
}