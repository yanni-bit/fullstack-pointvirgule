import { NextRequest, NextResponse } from 'next/server';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, service } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Champs requis manquants' },
        { status: 400 }
      );
    }

    const command = new SendEmailCommand({
      Source: process.env.AWS_SES_FROM!,
      Destination: {
        ToAddresses: [process.env.AWS_SES_TO!],
      },
      Message: {
        Subject: {
          Data: `[fullstack-pointvirgule.fr] Nouveau message de ${name}`,
          Charset: 'UTF-8',
        },
        Body: {
          Text: {
            Data: `Nom : ${name}\nEmail : ${email}\nService : ${service || 'Non précisé'}\n\nMessage :\n${message}`,
            Charset: 'UTF-8',
          },
          Html: {
            Data: `
              <div style="font-family: Arial, sans-serif; max-width: 600px;">
                <h2 style="color: #2196F3;">Nouveau message — fullstack-pointvirgule.fr</h2>
                <table style="width:100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px; font-weight: bold;">Nom</td><td style="padding: 8px;">${name}</td></tr>
                  <tr><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;">${email}</td></tr>
                  <tr><td style="padding: 8px; font-weight: bold;">Service</td><td style="padding: 8px;">${service || 'Non précisé'}</td></tr>
                </table>
                <h3>Message :</h3>
                <p style="background: #f5f5f5; padding: 16px; border-radius: 8px;">${message.replace(/\n/g, '<br/>')}</p>
              </div>
            `,
            Charset: 'UTF-8',
          },
        },
      },
      ReplyToAddresses: [email],
    });

    await ses.send(command);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('SES error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi' },
      { status: 500 }
    );
  }
}