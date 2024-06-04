import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

// Load JWT secret from environment variable or use a secure default value
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return res.status(400).send({msg:"Wrong password or Username"});

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET
    );

    const { password, role, ...otherDetails } = user._doc;
                                                                                                                                                          
    // Set the JWT token as a cookie in the response
    res.cookie("access_token", token, {
      httpOnly: true,
    });

    // Send user details and isAdmin in response body
    res.status(200).json({ details: { ...otherDetails, role                                                                                                                                                                                                                                                                                                       } });
  } catch (err) {
    next(err);
  }
};
