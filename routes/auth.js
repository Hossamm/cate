const express = require('express');
const router = express.Router();
const db = require('../Libraries/Database')
const jwt = require('../Libraries/Jwt')
const crypto = require('crypto');

router.post("/register", async (req, res) => {
    console.log(req.body)
    const { username, password } = req.body
  

    // Hash password
    let hashedPassword = crypto.createHash('md5').update(password).digest('hex')

    return await db.query(`
        INSERT INTO users (user_name, password)
      VALUES ($1, $2)
      RETURNING id
        `, [
        username,
        hashedPassword
        
    ])
        .then(async () => {
            const userid = (await db.query(`SELECT id as userid from users where user_name=$1`, [username])).rows[0]


            const token = await jwt.generateToken({
                userId: userid.userid
            })

            return res.status(201).json({
                "status": "success",
                "message": "Registration successful",
                "data": {
                    "accessToken": token,
                    "user": {
                        "userId": "" + userid.userid,
                        "userName": username,
                    }
                }
            })
        }).catch(error => {
            console.log(error)
            return res.status(400).json(
                {
                    "status": "Bad request",
                    "message": "Registration unsuccessful",
                    "statusCode": 400
                }
            )
        })
})
router.post("/login", async (req, res) => {

//    res.clearCookie('Token');
//    res.clearCookie('refToken', { path: '/api/refresh' });
        console.log(req.body)

try {

    const { username, password } = req.body

    // Hash password
    let hashedPassword = crypto.createHash('md5').update(password).digest('hex') // Commented by Hossam
   //   let hashedPassword = password; 

    console.log( 'start login' ); // Hossam
 
    const user = await db.query(`SELECT * from users where user_name =$1 and password =$2`, [
        username,
        hashedPassword
    ])
    if (user.rowCount > 0) 
    {
        console.log('Record Selected : ' + JSON.stringify( user.rows[0])) // Hossam
        let { id, user_name} = user.rows[0];
        
          const token =  await jwt.generateToken({ userId: id })
          const refToken = await jwt.generateRefreshToken({ userId: id })


              // Set cookies
        res.cookie('token', token, {
            httpOnly: true,
            secure: true, // Use secure in production
            sameSite: 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000 // 1 days -- //15 * 60 * 1000 // 15 minutes
        });
      
        res.cookie('refToken', refToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
          // path: '/user/reftoken', // Only sent to refresh endpoint
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
            
                res.status(200).json(
                {
                    "status": "success",
                    "message": "Login successful",
                    "data": {
                        "Token":{ 
                            "Token": token,
                            "RefreshToken": refToken,
                                },
                        "user": {
                            "id": "" + id,
                            "username": "" + username
                            
                        }
                    }
                }
            ) 
        
    } else {
        return res.status(401).json({
            "status": "Bad request",
            "message": "Authentication failed",
            "statusCode": 401
        })
    }

} catch (error) {
    console.log(error)
    return res.status(403).json({
        "status": "Error in Response",
        "message": error,
        "statusCode": 403
    })
}


console.log("end login")
})

router.post('/reftoken', async (req, res) => {
    const reftoken = req.refToken;
    console.log('You are in refToken')
    try {
    if (!reftoken) {
      return res.status(401).json({ message: 'Refresh token required' });
    }
    
       let { userId } = await jwt.verifyrefToken(reftoken)
    
      // Create new access token
      const token =  await jwt.generateToken({ userId: userId })

      // Set new access token cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 1 * 60 * 1000   // 15 minutes
      });
      
      res.json({ message: 'Token refreshed successfully' });

    }catch (error) { console.log(error) }
    });
  
  // Logout endpoint
  router.post('/logout', async (req, res) => {
    // Clear both cookies
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken', { path: '/user/reftoken' });
    
    res.json({ message: 'Logged out successfully' });
  });

module.exports = router;