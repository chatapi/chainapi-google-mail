let nodemailer = require('nodemailer');


const from = "ENTER_YOU_EMAIL_HERE";
const pass = "ENTER_YOU_PASSWORD_HERE";
/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.sendMail = (req, res) => {

    //to - Comma separated list  email addresses that will appear on the To: field
    const to = req.query.to ? req.query.to : req.body.to;
    //cc - Comma separated list   email addresses that will appear on the Cc: field
    const cc = req.query.cc ? req.query.cc : req.body.cc;
    //bcc - Comma separated list  of recipients email addresses that will appear on the Bcc: field
    const bcc = req.query.bcc ? req.query.bcc : req.body.bcc;
    //subject - The subject of the email
    const subject = req.query.subject ? req.query.subject : req.body.subject;
    //text - The plaintext version of the message as an Unicode string,
    const text = req.query.text ? req.query.text : req.body.text;
    //html - The HTML version of the message as an Unicode string
    const html = req.query.html ? req.query.html : req.body.html;

    const handleError = (err) => {
        res.status(500).send(JSON.stringify(err));
    }
    const testVars = () => {
        if (!from) {
            handleError({err: "From field not set"});
        }
        if (!to) {
            handleError({err: "'To' field not set"});
        }
        if (!text && !html) {
            handleError({err: "No message text was found"});
        }
        let pattern = new RegExp('^\S+@\S+$', 'i');
        if (!from.match(new RegExp(pattern)) || !to.match(new RegExp(pattern))) {
            handleError({err: "No valid url was found"});
        }
    }

    const sendMail = () => {
        return new Promise((resolve, reject) => {
            let mail = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: from,
                    pass: pass,
                }
            });

            let mailOptions = {
                from: from,
                to: to,
                subject: subject,
                cc,
                bcc,
                html,
                text
            };
            mail.sendMail(mailOptions, function (error, info) {
                if (error) {
                    reject(error);
                } else {
                    resolve(info)
                }
            });
        })


    }

    testVars();
    sendMail().then(mailInfo => {
        res.status(200).send(JSON.stringify(mailInfo));
    }, err => {
        handleError(err);
    })


}
