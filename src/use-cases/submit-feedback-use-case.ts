// USE-CASES :  TODAS AÇÕES QUE UM USUÁRIO EXECUTA NA APLICAÇÃO

import { MailAdapter } from "../adapters/mail-adapter";
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
        private mailAdapter: MailAdapter, // depende da interface e não da implementação
    ) { };

    async execute(request: SubmitFeedbackUseCaseRequest) {

        const { type, comment, screenshot } = request;

        if (!type) {
            throw new Error('Type is required');
        }

        if (!comment) {
            throw new Error('Comment is required');
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format');
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        });

        await this.mailAdapter.sendMail({
            subject: 'Novo email',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo de feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                `</div>`,
            ].join('\n')
        });

    }
}