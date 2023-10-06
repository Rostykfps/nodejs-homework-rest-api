const sgMail = require('@sendgrid/mail');

require('dotenv').config();

const { SENDGRID_API_KEY, EMAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (
  data = {
    to: 'wawije7942@htoal.com',
    subject: 'test mail',
    html: '<p>test</p>',
  },
) => {
  const mail = { ...data, from: EMAIL_FROM };
  await sgMail.send(mail);
  return true;
};

module.exports = sendMail;

/**
|--------------------------------------------------
| Code for use "Elastik Email"
|--------------------------------------------------
*/

// const ElasticEmail = require('@elasticemail/elasticemail-client');
// require('dotenv').config();

// const { ELASTIC_API_KEY, EMAIL_FROM } = process.env;

// const defaultClient = ElasticEmail.ApiClient.instance;

// const { apikey } = defaultClient.authentications;
// apikey.apiKey = ELASTIC_API_KEY;

// const api = new ElasticEmail.EmailsApi();

// const sendMail = () => {
//   const email = ElasticEmail.EmailMessageData.constructFromObject({
//     Recipients: [new ElasticEmail.EmailRecipient('wawije7942@htoal.com')],
//     Content: {
//       Body: [
//         ElasticEmail.BodyPart.constructFromObject({
//           ContentType: 'HTML',
//           Content: '<strong>Test email</strong>',
//         }),
//       ],
//       Subject: 'Test email',
//       From: EMAIL_FROM,
//     },
//   });

//   const callback = function (error, data, response) {
//     if (error) {
//       console.error(error.message);
//     } else {
//       console.log('API called successfully.');
//     }
//   };

//   api.emailsPost(email, callback);
// };
