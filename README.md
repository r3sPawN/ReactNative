## SetUp

```javascript

# run nodemailer server
npm run server

# after that run expo on web
npm start

I cannot get it working on android, something is blocking the connection with the phone 
```

## Description

The mailing server is located in Porject/mailserver/nodemailer.js && mail.js
#
App.js contains all of the front-end logic and validations
#
To use the send email functionality, first the user should provide a city and after that an email, which I validate with simple regex! 