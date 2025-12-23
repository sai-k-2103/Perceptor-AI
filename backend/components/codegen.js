const { Hercai } = require('hercai');
const client = new Hercai();
async function reply(req,res){
  const {language,topic}=req.body;
  client.question({content:`write a code on ${topic} in ${language}`})
  .then(response => {
    const str = response.reply
    let ans = ''
    let cnt = 0;
    for(let ch of str){
      if(ch=='`'){
        cnt++;
        continue;
      } 
      if(cnt==3){
        ans += ch
      }
    }
    res.send(ans);
  })
}
module.exports=reply;