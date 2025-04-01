import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    // const user = await User.create(req.body );
    const user = await new User(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.json({ message: "Erreur serveur : ", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "Utulisateur introuvable." });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.json({ message: "Mot de passe incorrect." });

    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      domaine: "localhost",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Connexion reussie !",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.json({ message: "Erreur serveur : ", error: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", { httpOnly: true, secure: true });
    res.json({ message: "Deconnexion reussie" });
  } catch (err) {
    res.json({ message: "Erreur serveur : ", error: err.message });
  }
};

export const profile = async (req,res) => {
  res.json({user: req.user})
}