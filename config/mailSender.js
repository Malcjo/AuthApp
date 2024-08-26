const nodemailer = require('nodemailer');

module.exports = async (data, mailType) =>{
    try {//AuthApp
        let mailConfig = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 456, false for other ports
            auth:{
                user: "joshuaeric.malcolm@gmail.com",// gnerated etheral user
                pass: "wqbo ymkc zpwo zjsp",// generated ethereal user
            },
        });

        const mailOptions = {
            from:"joshuaeric.malcolm@gmail.com",
            to: data.email,
            subject:"Verify your mail for JWT auth App",
            text:"Sent this mail for verification",
        }
        await mailConfig.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
}