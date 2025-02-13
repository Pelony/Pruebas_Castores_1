import { transporter } from "../config/nodemailer"

interface IEmail{
    email:string
    name:string
    token:string
}

export class AuthEmail{
    static sendConfirmationEmail = async ( user:IEmail ) =>{
        const info = await transporter.sendMail({
            from: 'jonathanAndrade<admin@andrade.com>',
            to: user.email,
            subject: 'Confirma tu cuenta',
            text:'Confirma',
            html: `<p>Hola: ${user.name}, has creado tu cuenta en pruebas, ya casi esta todo listo, solo debes confirmar tu cuenta</p>
            <p>Visita el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
            <p>E ingresa el código: <b>${user.token}</b></p>
            <p>Este token expira en 10 minutos</p>
        `
        })
        console.log('Mensaje Enviado', info.messageId)
    }
    static sendPasswordReset = async ( user:IEmail ) =>{
        const info = await transporter.sendMail({
            from: 'jonathanAndrade<admin@andrade.com>',
            to: user.email,
            subject: 'Restablece',
            text:'Restablece',
            html: `<p>Hola: ${user.name}, has solicitado recuperar tu contraseña</p>
            <p>Visita el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/new-password">Restablece contraseña</a>
            
        `
        })
        console.log('Mensaje Enviado', info.messageId)
    }
}