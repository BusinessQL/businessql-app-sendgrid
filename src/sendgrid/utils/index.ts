export type SendEmailOptions = {
  apiKey: string;
  to: string;
  from: string;
  subject: string;
  text: string;
  html?: string;
};

export const sendEmail = async ({
  apiKey,
  to,
  from,
  subject,
  text,
  html,
}: SendEmailOptions): Promise<void> => {
  const sendgrid = require('@sendgrid/mail');

  sendgrid.setApiKey(apiKey);

  await sendgrid.send({
    to,
    from,
    subject,
    text,
    html,
  });
};
