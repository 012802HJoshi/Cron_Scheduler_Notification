const nodemailer = require("nodemailer");



const emailPusher = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and PIN are required"
        });
    }
    
   const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,         
    secure: false,     
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});
    const mailOptions = {
        from: `"ASD Support" <${process.env.EMAIL}>`,
        to: email,
        subject: "Private Video Access PIN",
        text: `Hi,

Sorry for the inconvenience.

${password} is your PIN. Please use it to access the private video folder.
If you received this email by mistake, please ignore it.

We are really sorry for the delay. If you are still facing issues accessing the private video, please reply to this email and our team will assist you.

Thanks and best regards,
ASD Team`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return res.status(200).json({
            message: "Mail Sent Successfully",
            data: info.response
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error in Mail Transporter",
            error
        });
    }
};


module.exports={
    emailPusher
};