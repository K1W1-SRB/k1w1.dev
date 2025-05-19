// src/app/api/send-email/route.ts
import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // email to yourself
    await sgMail.send({
      to: "softwaredeveloper.k1w1@gmail.com", // your own email address to receive messages
      from: "noreply@k1w1.dev", // your verified sender email (must be verified!)
      subject: `New contact form message from ${name}`,
      text: message,
      html: `<p>${message}</p><p>From: ${name} (${email})</p>`,
      replyTo: email, // so you can reply directly to the person contacting you
    });

    //send user a confirmation email
    await sgMail.send({
      to: email,
      from: "noreply@k1w1.dev", // your verified sender email (must be verified!)
      subject: `New contact form message from ${name}`,
      text: message,
      html: `<p>${message}</p><p>From: ${name} (${email})</p>`,
      replyTo: email, // so you can reply directly to the person contacting you
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("SendGrid Error:", error);
    return NextResponse.json(
      { success: false, error: "Email failed to send" },
      { status: 500 }
    );
  }
}
