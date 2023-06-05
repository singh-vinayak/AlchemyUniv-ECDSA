const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const {generateNonce} = require('./scripts/generateNonce.js');

app.use(cors());
app.use(express.json());

const balances = {
  "03b376b3602808fb832811d24ecbd5333d8c5702499911374c8bc7cb35914e928f": 100, // 7f9b1747894485d2833f8bf38b4c15841cb6c58d0e374ecc43a511958d1efd30
  "0217096205fd2d44d19d9505cf116b47c7c2b4aa94223ddc6588edffc4b280e70d": 50,  // e6dbdcbd41ddbf0ebd95084ba919fe7bf9f64c31e9be0477568656b9f7e1c749
  "029c2292ddbe31746c705d79b9c09a37275cba32045f799d17d83ef8d03b620b87": 75,  // 7c1f1db9fec4489e53814018a26a65e491d07359f372db56ad042c77495ef36f
};
const transactions = [];

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    transactions.push({ sender: sender, recipient: recipient, nonce: generateNonce()});
    console.log(transactions);
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
