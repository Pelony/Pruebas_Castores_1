import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/AuthController";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.post(
  "/create-account",
  body("name").notEmpty().withMessage("Es necesario colocar un nombre"),
  body("email").isEmail().withMessage("Es necesario colocar un correo"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Es necesario colocar un password cn mas de 8 caracteres"),
  body("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Los passowrd no son iguales");
    }
    return true;
  }),
  body("user").notEmpty().withMessage("Es necesario colocar un usuario"),
  body("lastName").notEmpty().withMessage("Es necesario colocar un apellido"),
  handleInputErrors,
  AuthController.createAccount
);

router.post(
  "/confirm-account",
  body("token").notEmpty().withMessage("Es Token es necesario"),
  handleInputErrors,
  AuthController.confirmAccount
);

router.post("/login",
  body("email").isEmail().withMessage("Es necesario colocar un correo"),
  body("password").notEmpty().withMessage("Es necesario colocar una contraseña"),
  handleInputErrors,
  AuthController.login
);

export default router;
