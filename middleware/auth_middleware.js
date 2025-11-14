require('dotenv').config();
const jwt = require('../Libraries/Jwt')
const db = require('../Libraries/Database')
//const path = require('path'); // Import the 'path' module Hossam

module.exports = async (req, res, next) => {
   
    const token = req.cookies.token;
    const reftoken = req.cookies.refToken


    if (!token) {
       // return res.status(401).json({ message: 'Authentication required' });

        // If there's no access token but a refresh token exists, we try to refresh
        if (reftoken) {
            // Skip to the refresh logic
            return refreshFlow(req, res, next, reftoken);
        }
        // return res.status(401).json({ message: 'Access Token required' });
         const html = `<h1 style = "text-align: center; color: red">اضغط على الرابط لادخال اسم المستخدم و كلمت المرور</h1>
                        <a href="/" style="display: block; width: fit-content; margin: auto;font-size: 1.5rem;">LogIn</a>   `;
         return res.send(html);

        // return res.sendFile(process.cwd() + '/public/login.html');
        //res.redirect('/login.html');
      }
   
      console.log("In Meddleware")
    
   // token = token.split(' ')[1]; // This line commented by Hossam. Please check the function of this line.
    try {
        let { userId } = await jwt.verifyToken(token)
        console.log(userId)
        await db.query(`SELECT * from users where id =$1`, [userId])
        .then((user)=>{
            if   (user.rowCount > 0) 
            {
                console.log('the ID from Middleware : ' + userId)
                req.userId = userId
                return next()
            }
                return res.status(403).json({
                    "status": "No User Selected",
                    "message": "No User Selected",
                    "statusCode": 403
                })
                })
        
    } catch (error) {
                    if (error.message === 'jwt expired')
                    {
                    
                        console.log(error)
                        return refreshFlow(req, res, next, reftoken);
                        
                        /*
                        return res.status(401).json({
                            "status": "Token Error",
                            "message": "jwt token is expired",
                            "statusCode": 401})
                        */
                    }
                    else{
                            console.log(error)
                            return res.status(500).json({
                                "status": "Token or SQL Error",
                                "message": "Please read the execution log",
                                "statusCode": 500
                                                })
                        }
    }

}


// Logic for the refresh process
const refreshFlow = (req, res, next, reftoken) => {
   
       console.log('You are in refToken')
       try {
       if (!reftoken) {
        return res.status(401).json({ message: 'Refresh token required' });
       }
       
          jwt.verifyrefToken(reftoken).then ((tokenData)=>{
            let {userId} = tokenData;
            const token = jwt.generateToken({ userId: userId })
            res.setHeader('token', token);
            req.userId = userId;
            
            
          })
       
        // res.json({ message: 'Token refreshed successfully' });
   
       }catch (error) { console.log(error) }
       
        return next();

};