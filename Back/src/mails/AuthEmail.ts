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
            html:`<p> Hola: ${user.name} Haz creado tu cuenta en las pruebas, por favor confirma tu cuenta </p>
            <p> Visita el siguiente enlace:</p>
            <a href=""> Confirma tu cuenta </a>
            <p>E ingresa el codigo: <b>${user.token}</b></p>
            <p>Este token expira en 10 minutos </p>`
        })
        console.log('Mensaje Enviado', info.messageId)
    }
}