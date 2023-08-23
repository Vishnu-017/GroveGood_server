const Customer = require("../models/customerModel");
const jwt = require("jsonwebtoken");
const twilio = require('twilio')

// create token function. we can use this function many times
// userid + secret = token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// SIGNUP
const customerSignup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const customer = await Customer.signup(
      firstName,
      lastName,
      email,
      password
    );

    const customerfirstName = customer.firstName;

    const token = createToken(customer._id);

    res.status(200).json({ customerfirstName, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// LOGIN
const customerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.login(email, password);

    const customerfirstName = customer.firstName;

    const token = createToken(customer._id);

    res.status(200).json({ customerfirstName, email, token });
  } catch (error) {
    res.status(400).json({ error: "122"});
  }
};

//sms
const customerSms = async (req, res) => {
  const queryParam = req.query.word;
  const processedData = `You sent: ${queryParam}`;
  console.log(processedData)
  // res.json({ result: processedData });
  try {
    
async function orderSMS(){
  const client = await new twilio(process.env.TWILIO_SID2, process.env.TWILIO_AUTH_TOKEN2)
  return client.messages
  .create({body: "Dear customer thank you for using the GroveGood, your order has been successfully placed and it will be delivered with 5-7 days-THANK YOU", from: '+16188457142', to: '+916384281065'})
  .then(message => {
      console.log(message, " message sent")
  })
  .catch(err => {
      console.log(err, "message not sent")
  })
}

async function paymentSMS(){
  const client = await new twilio(process.env.TWILIO_SID2, process.env.TWILIO_AUTH_TOKEN2)
  return client.messages
  .create({body: `Dear customer the amount of ${queryParam} has been debited from your account - THANK YOU`, from: '+16188457142', to: '+916384281065'})  //+91634281065   +916385553279
  .then(message => {
      console.log(message, " message sent")

  })
  .catch(err => {
      console.log(err, "message not sent")
  })
}

async function producerSMS (){
  const client = await new twilio(process.env.TWILIO_SID1, process.env.TWILIO_AUTH_TOKEN1)
  return client.messages
  .create({body: "Dear producer your have got an order for aloevara product, Please make sure that you prepare and deliver it on time - THANK YOU ", from: '+15095162408', to: '+916385553279'})
  .then(message => {
      console.log(message, " message sent")

  })
  .catch(err => {
      console.log(err, "message not sent")
  })

  }
  console.log("messge sended")

  setTimeout(() => {
    paymentSMS()
    orderSMS()
    producerSMS()

  }, 10000);
    
    res.status(200).json({message:"success"});
  } catch (error) {
    res.status(400).json({ error: "122"});
  }
};

module.exports = {
  customerSignup,
  customerLogin,
  customerSms,
};
