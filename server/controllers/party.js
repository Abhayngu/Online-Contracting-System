const Party = require('../models/Party');
const passport = require('passport');

exports.createParty = async (req, res)=> {
    console.log(req.body);
    let {name, email, password,description} = req.body;

    let userData = {
        name : name,
        email : email,
        description : description
    };

    const existingUser = await Party.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ message: 'Party already exists with this email' });
    }

    Party.register(userData, password, (err, user)=> {
        if(err) {
           
            // res.redirect('/signup');
            console.log(err);
            res.send(err);
        }
        passport.authenticate('local') (req, res, ()=> {
            return res.json({ message: 'Party registered sucessfully' });
            // res.redirect('/login');
            // res.send('success');
        });
    });

}


exports.login = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.session.email = user.email;
      return res.json({ message: 'Successfully logged in with user' + req.session.email  });
      // res.render('update');
    });
  })(req, res, next);
};

exports.updateParty = async (req,res,next) => {
  const { name, description} = req.body;
  const email = req.session.email;

  console.log(email);
  console.log(req.isAuthenticated());

  try {
    const user = await Party.findOne({email : email});

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (description) user.email = email;


    await user.save();

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

}

exports.deleteParty = async (req,res,next) => {

  const email = req.session.email;

  try {
    const deletedUser = await Party.findOneAndDelete(email);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

}

exports.changePassword = async (req, res, next) => {
  const email = req.body.email;

  const token = crypto.randomBytes(20).toString('hex');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  Party.findOneAndUpdate(
      { email: email },
      { resetPasswordToken: token, resetPasswordExpires: Date.now() + 3000 }, 
      { new: true, upsert: false }
    )
    .then(user => {
      console.log(`Reset token ${token} added for user with email ${user.email}`);
    })
    .catch(err => {
      console.error(err.message);
    });

  const mailOptions = {
    from: 'Shubham Rathore',
    to: email,
    subject: 'Password Reset',
    text: `You are receiving this email because you has requested a password reset for your account.\n\n` +
          `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
          `http://${req.headers.host}/reset-password/${token}\n\n` +
          `If you did not request this, please ignore this email and your password will remain unchanged.\n`
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return next(err);
    }
    console.log(`Message sent: ${info.messageId}`);
    res.json({ message: 'An email has been sent to the provided email with further instructions.' });
  });
};
