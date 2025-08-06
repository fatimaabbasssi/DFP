import jwt from "jsonwebtoken"; //new password token 
import User from "../models/User.js";
import { signInToken } from "../utils/token.js";
import ctmSendEmail from "../utils/Email.js"; ///reset email















export const signUp = async (req, res) => {
  try {

    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Missing required fields",
      })
    }


    /// checks if user already user exists
    let isExistAlready = await User.findOne({ email }); //WITH EMAIL

    if (isExistAlready) {
      res.status(200).json({
        success: false,
        message: "User Already Registered!"
      })
    }

    /// creating  user

    let user = await User.create(req.body);
    let token = signInToken(user);
    res.status(201).json({
      user,
      token,
      success: true,
      message: "User Registered successfully!"
    });




  } catch (error) {
    res.status(500).json({
      success: false,
      message: "SignUp Failed",
      error: error.message
    })
  }
}

















/////////////////////////////// login ////////////////////////////////




export let login = async (req, res) => {
  try {
    let { email, password } = req.body;

    // user with password
    let userRef = await User.findOne({ email }).select("+password"); // get password for comparison

    if (!userRef || !(await userRef.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials"
      });
    }

    //  Removing password before sending user data to client
    let userWithoutPassword = userRef.toObject();
    delete userWithoutPassword.password;

    const token = signInToken(userRef);
    res.status(201).json({
      user: userWithoutPassword,
      token,
      success: true,
      message: "user logged in successfully!"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login Failed",
      error: error.message
    });
  }
};



















///////////////////////////////forgot Password

export let forgetPass = async (req, res) => {

  // console.log('res from forget passssss');

  let { email } = req.body
  let userRef = await User.findOne({ email })

  if (!userRef) {
    return res.status(404).json({
      success: false,
      message: 'user not found'
    })
  }


  /// reset token

  let resetToken = jwt.sign(
    { id: userRef._id },
    process.env.JWT_SECRET,
    { expiresIn: '5m' }
  )


  ///frontend website connection

  let resetUrl = `${process.env.WEBSITE_URL}/resetpass/${resetToken}`

  try {

    await ctmSendEmail({

      to: userRef.email,
      subject: "Reset Password",
      html: `
         <div style="margin: 0 auto; width: 90%; height: 500px;">
          <h1 style="color: gold;" >Reset Password</h1>
          <p style="color: gray;">
          here is link for your forget password request reset your password.
          </p>
          <p>Click here to reset <a href="${resetUrl}">Reset </a></p>
        </div>
        `
    })


    /// succeess  response

    res.status(200).json({
      success: true,
      message: "Password reset email sent successfully!"
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Email send Failed",
      error: error.message
    });
  }

}



















////////////////////////////////reset password


export let resetPassword = async (req, res) => {
  let { token, password } = req.body
  try {

    let decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    let userRef = await User.findById(decodedUser.id);

    if (!userRef) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    ///// update user password
    userRef.password = password;
    userRef.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully!"
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Password Reset Failed",
      error: error.message
    });
  }
}
