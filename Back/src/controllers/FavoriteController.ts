import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Favorite, { IFavorite } from '../models/Favorite';

export const addFavorite = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { videoId, title, description, thumbnail } = req.body;

  try {
    const favorite: IFavorite = new Favorite({ videoId, title, description, thumbnail });
    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    console.error('Failed to save favorite:', error);
    res.status(500).json({ error: 'Failed to save favorite' });
  }
};
