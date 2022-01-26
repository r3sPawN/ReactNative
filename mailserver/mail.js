const nodemailer = require(`nodemailer`);

async function sendEmail(emailAddress, weatherInfo) {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "einar.kessler26@ethereal.email",
      pass: "gwzMhp5B4VtVUZubhF",
    },
  });

  let info = await transporter.sendMail({
    from: "<einar.kessler26@ethereal.email>", // sender address
    to: `${emailAddress}`, // list of receivers
    subject: "Hello ✔", // Subject line
    text: `The current time in ${weatherInfo.location.name} is ${weatherInfo.location.localtime} 
      and the temperature is ${weatherInfo.current.temp_c} degrees`, // plain text body
    html: `The current time in ${weatherInfo.location.name} is ${weatherInfo.location.localtime} 
      and the temperature is ${weatherInfo.current.temp_c} degrees`, // html body
  });
  console.log('Email was send');
  return (url = nodemailer.getTestMessageUrl(info));
}

module.exports = sendEmail;
