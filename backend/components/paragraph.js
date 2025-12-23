const { Hercai } = require('hercai');
const client = new Hercai();
const getData= async(req,res)=>{
    const  topic=req.body;
    console.log(topic);
    client.question({content:`write a paragraph on ${topic.topic}`})
  .then(response => {
    res.send(response.reply)
  })
}
module.exports.getData=getData;