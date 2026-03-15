import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({
      $or: [{ email }, { username }]
    });

    if (isUserAlreadyExist) {
      return res.status(400).json({
        message: "User with this email or username already exists",
        success: false
      });
    }

    // create user
    const user = await userModel.create({ username, email, password });

    // create email verification token
    const emailVerificationToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // send email
    await sendEmail({
      to: email,
      subject: "Welcome to Perplexity",
      text: `${username} thank you for registering`,
      html: `
        <p>Hi ${username},</p>
        <p>Thank you for registering at <strong>Perplexity</strong>.</p>
        <p>Please verify your email:</p>
        <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">
        Verify Email
        </a>
      `
    });

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      success: false,
      error: error.message
    });
  }
}