import { Router } from "express";
import { body,param } from "express-validator";
import { addFavorite } from "../controllers/FavoriteController";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.post(
    "/favorites",
    body('videoId').notEmpty().withMessage('El ID del video es requerido'),
  body('title').notEmpty().withMessage('El título del video es requerido'),
  body('description').notEmpty().withMessage('La descripción del video es requerida'),
  body('thumbnail').notEmpty().withMessage('La URL del thumbnail es requerida'),
    handleInputErrors,
    addFavorite
  );

  export default router;