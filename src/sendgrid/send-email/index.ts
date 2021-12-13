import { Request, Response } from 'express';
import { sendEmail } from '../utils';

export type SendEmailPayload = {
  apiKey: string;
  to: string;
  from: string;
  subject: string;
  text: string;
  html?: string;
};

export const sendEmailHandler = async (req: Request, res: Response) => {
  try {
    const { apiKey, to, from, subject, text, html } = req.body
      .payload as SendEmailPayload;

    if (!apiKey) {
      throw new Error('Missing apiKey');
    }

    if (!to) {
      throw new Error('Missing to');
    }

    if (!from) {
      throw new Error('Missing from');
    }

    if (!subject) {
      throw new Error('Missing subject');
    }

    if (!text) {
      throw new Error('Missing text');
    }

    await sendEmail({ apiKey, to, from, subject, text, html });

    return res.json({ sent: true });
  } catch (error: any) {
    console.log(error.response.body.errors);
    return res.status(500).send(error.message || 'Failed to send email.');
  }
};
