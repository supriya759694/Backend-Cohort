import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";


/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 * @body { username, email, password }
 */

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
      { id: user._id, email: user.email },
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
         <p>If you did not create an account, please ignore this email.</p>
         <p>Best regards,<br>The Perplexity Team</p>
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

/**
 * @desc Login user and return JWT token
 * @route POST /api/auth/login
 * @access Public
 * @body { email, password }
 */

export async function login(req, res){
 const { email, password } = req.body;

 const user = await userModel.findOne({ email });

 if(!user){
    return res.status(400).json({
      message: "Invalid email or password",
      success : false,
      err : 'user not found'
    })
 }

 const isPasswordMatch = await user.comparePassword(password);

 if(!isPasswordMatch){
    return res.status(400).json({
      message: "Invalid email or password",
      success : false,
      err : 'Incorrect password'
    })
 }

 if(!user.verified){
   return  res.status(400).json({
    message : "Email not  verified",
    success : false,
    err : 'Email not verified'
   })
 }

 const token = jwt.sign({
  id : user._id,
  username : user.username,
  email : user.email
 }, process.env.JWT_SECRET, { expiresIn : '7d'});

 res.cookie("token",token)

 res.status(200).json({
  message : 'Login successful',
  success : true,
  token : token,
  user : {
    id : user._id,
    username : user.username,
    email : user.email
  }
 })

 }




/**
 * @desc Verify user's email address
 * @route GET /api/auth/verify-email
 * @access Public
 * @query { token }
 */

export async function verifyEmail(req,res){
      const {token}= req.query;

      try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if(!user){
          return res.status(400).json({
            message : "Invalid Token",
            success : false,
            err : 'User not found'
          })
        }

        user.verified = true;
        await user.save();

        const html =  `
        <h1>Email Verified Successfully!</h1>
        <p>Your email has been verified. You can now log in to your account.</p>
        <a href="http://localhost:3000/login">Go to Login</a>
    `
    return res.status(200).send(html);
    }catch(err){
       return  res.status(400).json({
        message : "Invalid or Expired Token",
        success : false,
        err : err.message
       })
    }
}

