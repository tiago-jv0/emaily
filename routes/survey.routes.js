const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const mongoose = require('mongoose');
const Mailer = require('../services/Mailer');

const surveyTemplate = require('../services/emailTemplates/survey.template');

const Survey = mongoose.model('Surveys');

module.exports = (app) => {

  app.get('/api/surveys/thanks' , (req, resp) => {
    return resp.send('Thanks for voting!')
  })
  app.post('/api/surveys', requireLogin, requireCredits, async (req, resp) => {
    let { title, subject, body, recipients } = req.body;

    recipients = recipients.split(',').map((email) => ({ email: email.trim() }));

    const survey = new Survey({
      title,
      subject,
      body,
      recipients,
      _user: req.user.id,
      dateSent: Date.now(),
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();

      req.user.credits -= 1;

      const user = await req.user.save();

      return resp.send(user);
    } catch (error) {
      return resp.status(422).send(error);
    }
  });
};
