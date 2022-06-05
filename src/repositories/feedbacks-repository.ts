// CONTRATO : DIZ O QUE QUE A GENTE PRECISA DE INFORMAÇÃO, MAS NÃO IMPLEMENTA

export interface FeedbackCreateData {
    type: string;
    comment: string;
    screenshot?: string;
}

export interface FeedbacksRepository {
    create: (data: FeedbackCreateData) => Promise<void>;
}