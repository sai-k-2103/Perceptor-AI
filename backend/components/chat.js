const { Hercai } = require("hercai");
const client = new Hercai();
async function chat(req, res) {
  const { mytxt } = req.body;
  client.question({ content: `${mytxt}` }).then((response) => {
    res.send(response.reply);
  });
}
module.exports = chat;
