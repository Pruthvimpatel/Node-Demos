import nodemailer from  "nodemailer";
export const sendResetPasswordEmail = async(email:string, token: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASSWORD
        },
    });

    const resetUrl = `http://localhost:8000/api/v1/users/reset-password?token=${token}`;
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: 'Reset Your Password',
        html: `<p>You requested a password reset.</p><p>Click <a href="${resetUrl}">here</a> to reset your password.</p>
               <p><strong>${token}</strong></p>
               <p>This token will expire in 1 hour.</p>
        `,
        
    };

    await transporter.sendMail(mailOptions);
}