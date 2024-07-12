import { Router } from "express";
import { body } from 'express-validator';
import { AuthController } from "../controllers/AuthController";
import { handleInputErrors } from "../middleware/validation";

const router = Router()

router.post('/create-account',
    body('name').notEmpty().withMessage('Es necesario colocar un nombre'),
    body('email').isEmail().withMessage('Es necesario colocar un correo'),
    body('password').isLength({min:8}).withMessage('Es necesario colocar un password cn mas de 8 caracteres'),
    body('password_confirmation').custom((value,{req})=>{
        console.log(value)
        console.log(req.body.password)
    }),
    body('user').notEmpty().withMessage('Es necesario colocar un usuario'),
    body('lastName').notEmpty().withMessage('Es necesario colocar un apellido'),
    handleInputErrors,
    AuthController.createAccount
)


export default router