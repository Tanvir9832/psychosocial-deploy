const nodemailer = require("nodemailer");

const mailSender = async(email, subject, name, link, btn , content , body) => {
  try {

    console.log("nodemailer first");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  
    await transporter.sendMail(
      {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        html: `<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Reset Password</title>
          </head>
          <body style="box-sizing: border-box;">
              <div style="text-align: center; background-color: #EEE;padding: 35px 0px ; ">
                      <h1>HELLO ${name.toUpperCase()}</h1>
                      <h2 style="color: rgb(0, 0, 0);">${content}</h2>
                  <div>
                      <h4 style="color:rgb(0, 0, 0);">You have 30 minutes</h4>
                      <p style="color: rgb(0, 0, 0)">
                        ${body}
                      </p>
                  </div>
                  <a href="${link}" style= "color: black; text-decoration: none ;background-color: rgb(144, 238, 210); padding: 5px 25px; border: 1px solid black; border-radius: 2px; cursor: pointer;  ">${btn}</a>
              </div>
          </body>
          </html>`,
      }
    );
    console.log("nodemailer last");
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "mail couldn't send"});
  }
};

module.exports = mailSender;
