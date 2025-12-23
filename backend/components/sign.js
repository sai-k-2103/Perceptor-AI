const user=require('../Models/User.js')
const ErrorResponse =require('../utils/ErrorResponse.js')
async function register(req,res){
    const {username,email,password}=req.body;
    const cuser=new user({
        username,
        email,
        password
    });
    await cuser.save()
        .then((result)=>{
            console.log(result);
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
            res.send(err);
        })
}
const signin = async (req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password) next(new ErrorResponse("Please provide email and password !",400));
    try{
        const user1  = await user.findOne({
            email
        }).select("+password");
        if(!user1) return next(new ErrorResponse("Invalid email address !",400));
        const ismatch  = await user1.matchPassword(password);
        if(!ismatch) next(new ErrorResponse("Wrong password !",400));
        else sendToken(user1,res)
    }catch(err){
        next(new ErrorResponse(err.message,400));
    }
}

const sendToken = (user,res)=>{
    const token = user.getSignedToken();
    res.status(200).json({success:true,token})
}

module.exports={register,signin};