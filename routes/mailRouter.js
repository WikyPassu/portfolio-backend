const mailRouter = require("express").Router();
const Mail = require("../models/Mail");

// INSERT MAIL
mailRouter.post("/", async (req, res, next) => {
  try {
    const { mail } = req.body;

    if(!mail) {
      return next({
        status: 400, 
        name: "ValidationError", 
        msg: { 
          es: "Campos inválidos o inexistentes.", 
          en: "Invalid or non-existent fields."
      }});
    }
    
    mail.ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const currentTime = Math.floor(Date.now() / 1000);
    const lastMail = await Mail.findOne({ ip: mail.ip }).sort({ createdAt: -1 });
    
    if(!lastMail) {
      await Mail.create({ ...mail, createdAt: currentTime });
      return res.status(201).json({ 
        msg: { 
          es: "¡Mensaje enviado! Intentaré responder en la breveded.", 
          en: "Message sent! I'll try to reply as soon as possible." 
        }
      });
    }

    const elapsedMinutes = Math.floor((currentTime - lastMail.createdAt) / 60);

    if(elapsedMinutes > 29) {
      await Mail.create({ ...mail, createdAt: currentTime });
      return res.status(201).json({ 
        msg: { 
          es: "¡Mensaje enviado! Intentaré responder en la breveded.", 
          en: "Message sent! I'll try to reply as soon as possible." 
        }
      });
    }
    return next({ 
      status: 429, 
      name: "TooManyRequestsError", 
      msg: { 
        es: "Debes esperar unos minutos para enviar otro mensaje desde la web. De todas maneras, puedes contactarme al correo que figura en mi CV.", 
        en: "You must wait a few minutes to send another message from the web. In any case, you can contact me at the email that appears on my CV." 
      }
    });
  } catch(err) {
    console.log(err);
    err.status = 400;
    next(err);
  }
});

module.exports = { mailRouter };