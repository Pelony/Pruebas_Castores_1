import type { Request, Response } from "express";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import Token from "../models/Token";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../mails/AuthEmail";
import { generateJWT } from "../utils/jwt";

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    try {
      const { password, email } = req.body;

      const userExist = await User.findOne({ email });
      if (userExist) {
        const error = new Error("El usuario ya esta registrado");
        return res.status(409).json({ error: error.message });
      }

      const user = new User(req.body);
      user.password = await hashPassword(password);
      //Gen TOKEN
      const token = new Token();
      token.token = generateToken();
      token.user = user.id;

      AuthEmail.sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token: token.token,
      });

      await Promise.allSettled([user.save(), token.save()]);
      res.send("Cuenta creada, Revisa tu email para confirmarla");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
  static confirmAccount = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      const tokenExists = await Token.findOne({ token });
      if (!tokenExists) {
        const error = new Error("Token no valido");
        return res.status(404).json({ error: error.message });
      }

      const user = await User.findById(tokenExists.user);
      user.confirmed = true;

      await Promise.allSettled([user.save(), tokenExists.deleteOne()]);
      res.send("Cuenta confirmada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error("Usuario no encontrado");
        return res.status(404).json({ error: error.message });
      }
      if (!user.confirmed) {
        const token = new Token();
        token.user = user.id;
        token.token = generateToken();
        await token.save();
        AuthEmail.sendConfirmationEmail({
          email: user.email,
          name: user.name,
          token: token.token,
        });
        const error = new Error("La cuenta  no ha sido confirmada , hemos enviado a un e-mail de confirmacion");
        return res.status(401).json({ error: error.message });
      }

      const isPasswordCorrect = await checkPassword(password,user.password)
      if(!isPasswordCorrect){
        const error = new Error("La contraseña no es valida");
        return res.status(401).json({ error: error.message });
      }
      
      const token = generateJWT({id: user.id})
      res.send(token)

    } catch (error) {
        res.status(500).json({error:'Hubo un error'})
    }
  };

  static requestConfirmationCode = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error("El usuario no esta registrado");
        return res.status(409).json({ error: error.message });
      }
      if(user.confirmed){
        const error = new Error("El usuario ya esta confirmado");
        return res.status(403).json({ error: error.message });
      }
      //Gen TOKEN
      const token = new Token();
      token.token = generateToken();
      token.user = user.id;

      AuthEmail.sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token: token.token,
      });

      await Promise.allSettled([user.save(), token.save()]);
      res.send("Se envio un nuevo token");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  }

  static forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error("El usuario no esta registrado");
        return res.status(409).json({ error: error.message });
      }
      
      //Gen TOKEN
      const token = new Token();
      token.token = generateToken();
      token.user = user.id;
      await token.save();

      AuthEmail.sendPasswordReset({
        email: user.email,
        name: user.name,
        token: token.token,
      });

      res.send("Revisa tu email con las instrucciones");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  }
  static validateToken = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      const tokenExists = await Token.findOne({ token });
      if (!tokenExists) {
        const error = new Error("Token no valido");
        return res.status(404).json({ error: error.message });
      }

      res.send("Token valido define tu nuevo password");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
  static updatePasswordWithToken = async (req: Request, res: Response) => {
    try {
      const { token } = req.params;
      const {password} =req.body
      const tokenExists = await Token.findOne({ token });
      if (!tokenExists) {
        const error = new Error("Token no valido");
        return res.status(404).json({ error: error.message });
      }

      const user = await User.findById(tokenExists.user)
      user.password = await hashPassword(password)

      await Promise.allSettled([user.save(),tokenExists.deleteOne()])

      res.send("El password se modifico correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
