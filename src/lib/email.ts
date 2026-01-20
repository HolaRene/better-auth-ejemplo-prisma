import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!);

interface SendEmailsValues{
    to: string;
    subject: string;
    texto: string;
}

export async function envioEmail({to, subject,texto}: SendEmailsValues): Promise<void> {
    await resend.emails.send({
        from: 'verificacion@donjoe-example.com',
        to,
        subject,
        text:texto,
    })
    // Simulate sending an email
    console.log(`Sending email to: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${texto}`);
    // In a real implementation, integrate with an email service provider here
}