import express from 'express';
import { prisma } from './prisma';
import nodemailer from 'nodemailer';

const app = express();

app.use(express.json()); // pro express entender que quero pegar o body das requisições

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "0fdefa2b8fddb1",
        pass: "fea4ac9500ccc0"
    }
});

app.post('/feedbacks', async (req, res) => {

    // req é onde pego as informações enviadas por quem requisitou
    const { type, comment, screenshot } = req.body;

    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot
        }
    });

    await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Allan Dutra <meuemail@gmail.com>',
        subject: 'Novo feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Tipo de feedback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            `</div>`,
        ].join('\n')
    });

    return res.status(201).json({ data: feedback });
})

app.listen(3333, () => {
    console.log('HTTP server running!');
});