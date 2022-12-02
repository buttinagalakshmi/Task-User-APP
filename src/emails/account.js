const domain ='sandbox2dda81221e16445db96a7922d4041fe2.mailgun.org';
const api_key =process.env.MAIL_GUN_API_KEY
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 


const sendWelcomeEmail = (email,name)=>{

    // console.log(email),
    // console.log(name)
     var data = {
        from: 'Excited User <nagalakshmibutti2000@gmail.com>',
        to: email,
        subject: 'Congrats! For Up Coming wedding',
        text: 'welcome to club ' +name+ ' We are here to help you build your beautiful and ecstatic marriage life! Cheers...darling  '
      };
      mailgun.messages().send(data, function (error, body) {
        console.log(body);
        // console.log(data)
      });
}



const cancelingEmail = (email,name)=>{
    // console.log(email),
    // console.log(name)
     var data = {
        from: 'Babe.. <nagalakshmibutti2000@gmail.com>',
        to: email,
        subject: 'Sorry to see you go',
        text: 'Good Bye! ' +name+ ' Thanks for being our royal user so far. We Hope to see back sometime soon'
      };
      mailgun.messages().send(data, function (error, body) {
        console.log(body);
        // console.log(data)
      });
}

 


module.exports={
    sendWelcomeEmail,
    cancelingEmail
}