const nodemailer = require('nodemailer');
const openai = require('openai');

openai.apiKey = 'YOUR_OPENAI_KEY';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-password'
  }
});

const gpt3Prompt = 'YOUR_GPT3_PROMPT';

openai.Completion.create({
  engine: 'davinci',
  prompt: gpt3Prompt,
  max_tokens: 100
}).then(response => {
  let text = response.choices[0].text.strip();

  if (text.toLowerCase().includes('scheduling')) {
    text += '\n\nTo schedule a meeting, please use the following link: YOUR_CALENDLY_LINK';
  }

  if (text.toLowerCase().includes('investment') && (text.toLowerCase().includes('decline') || text.toLowerCase().includes('no'))) {
    text += '\n\nIt seems like you are not interested at the moment. But remember, investing is like a roller coaster ride, it's always scary at first but the thrill is worth it! Let's have a call sometime to discuss more.';
  }

  if (text.toLowerCase().includes('intro')) {
    text += '\n\nHi, I am [Your Name], [Your Position]. I am looking forward to our interaction.';
  }

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'receiver-email@gmail.com',
    subject: 'Auto Reply Message',
    text: text
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});