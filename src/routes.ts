import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';

export const routes = express.Router();

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "0fdefa2b8fddb1",
        pass: "fea4ac9500ccc0"
    }
});

routes.post('/feedbacks', async (req, res) => {

    // req é onde pego as informações enviadas por quem requisitou
    const { type, comment, screenshot } = req.body;

    const feedback = 

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
});