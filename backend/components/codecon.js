
const { Hercai } = require('hercai');
const client = new Hercai();
function codecon(req,res){
  let {ilang, olang, code } = req.body
  code = code.replaceAll("#", '')
  client.question({content:` ${code}. This is ${ilang} code please convert to ${olang}` })
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
module.exports=codecon