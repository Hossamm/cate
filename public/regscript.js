
const userRegstForm = document.getElementById('iduserRegstForm');
userRegstForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    userRegistration();
});

  function userRegistration() {

    // console.log("Hello")
    // Get text input value
    const usernameInput = document.getElementById('iduserName');
    const username = usernameInput.value;

    const userPasswdInput = document.getElementById('iduserPasswd');
    const userPasswd = userPasswdInput.value;


    fetch("/user/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {"username": username,
             "password":userPasswd
            }
                            )
        }).then(Response => Response.json()).then((jsonObject)=>{ 
            
           // console.log(jsonObject)
            if(jsonObject.statusCode === 400)
            { // console.log(jsonObject)
              document.getElementById("checkUser").style.display = "flex";
              document.getElementById("checkUser").style.color = "red";
              
            }
            else{
            window.location.href = "/login.html";
          }
            
        
        })
        
  }

  function myFunction() {
    var x = document.getElementById("iduserPasswd");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }


