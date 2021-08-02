export default class QuestionEntity {

    id: string;
    quizId: string;
    title: string | null;
    description: string | null;
    image: string | null;
    videoUrl: string | null;
    audioUrl: string | null;
    options: string[] | null;
    answerIndex: number | null;

    createdBy: string | null;
    createdAt: number | null;

    constructor(id: string ,
        quizId: string ,
        title: string | null,
        description: string | null,
        image: string | null,
        videoUrl: string | null,
        audioUrl: string | null,
        options: string[] | null,
        answerIndex: number | null,
        createdBy: string | null,
        createdAt: number | null) {

        this.id = id;
        this.quizId = quizId;
        this.title = title;
        this.description = description;
        this.image = image;
        this.videoUrl = videoUrl;
        this.audioUrl = audioUrl;
        this.options = options;
        this.answerIndex = answerIndex;

        this.createdBy = createdBy;
        this.createdAt = createdAt;

    }
}