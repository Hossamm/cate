

const userloginForm = document.getElementById('iduserloginForm');
userloginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
 await userLogin().then((userId)=>{
 
  if (userId)
  {
  window.location.href = '/server/mainPage.html'
  }
    
                                    })
    
});

async  function userLogin() {

   
    // Get text input value
    const usernameInput = document.getElementById('idloginUserName');
    const userName = usernameInput.value;

    const userPasswdInput = document.getElementById('idloginUserPasswd');
    const userPasswd = userPasswdInput.value;

   

   // console.log("Username:", userName);
    
   // console.log("UserPasswd:", userPasswd);



   return fetch("/user/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(
            {"username": userName, 
             "password":userPasswd
            }
                            )
        }).then(Response => Response.json()).then((jsonObject)=>{ 
            
          // console.log(jsonObject) 

          if(jsonObject.statusCode === 401)
            { // console.log(jsonObject)
              document.getElementById("checkUserandPassword").style.display = "flex";
              document.getElementById("checkUserandPassword").style.color = "red";
              
            }
            else{
              return jsonObject.data.user.id;
          }
            
        })
        
    }

  