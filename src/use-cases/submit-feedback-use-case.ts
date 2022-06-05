// USE-CASES :  TODAS AÇÕES QUE UM USUÁRIO EXECUTA NA APLICAÇÃO

import { FeedbacksRepository } from "../repositories/feedbacks-repository";

// Camadas diferentes da aplicação, 
// DRY - Dont repeat yourself
// Pode ser que em algum momento meu caso de uso receba informações que na camada de dados nao precise enviar.
// interfaces diferentes para camadas diferentes.
interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    // prisma inversamente injetado dentro desta classe.
    constructor(
        private feedbacksRepository: FeedbacksRepository,
    ) { };

    async execute(request: SubmitFeedbackUseCaseRequest) {

        const { type, comment, screenshot } = request;

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        });

    }
}