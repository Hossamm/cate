function getFormElementsByType(elementTag , elementType)
{
  allFormInputFeilds = [];
  allFormInputFeildsBy = []
 // comDataBeforUpd[0] = document.getElementById('ComType').value;
  allFormInputFeilds = document.getElementsByTagName(elementTag);
  // console.log( allFormInputFeilds)
  for(var i = 0; i < allFormInputFeilds.length; i++){
    if (allFormInputFeilds[i].type === elementType)
      
    {
      allFormInputFeildsBy[i] = allFormInputFeilds[i];  
    }
  }

  return allFormInputFeildsBy;

}

function getFormInputValues()
{
  comDataBeforUpd = [];
  comDataBeforUpd[0] = document.getElementById('ComType').value;
 // allFormInputFeilds = document.getElementsByTagName("input");
 allFormInputFeildsByType = getFormElementsByType('input' , 'text')
//  console.log( allFormInputFeildsByType)
  for(var i = 0; i <  allFormInputFeildsByType.length; i++){
    comDataBeforUpd[comDataBeforUpd.length] = allFormInputFeildsByType[i].value
      //console.log(allFormInputFeilds[i].value)
  }
  comDataBeforUpd.push(document.getElementById('ComNote').value)
  return comDataBeforUpd;
}



/*==================== The following function add after 2024-12-27 ===================
   const SearchForm = document.getElementById("SearchFormId");
   const SearchBtn = document.getElementById("SearchBtnId");

    SearchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    searchComSubmit();
   }) */

   function searchComSubmit(event, formPath){
    
        event.preventDefault();
        var mainDiv = document.getElementById('main');
        //https://developer.mozilla.org/en-US/docs/Web/API/FormData
        // FormData.entries()... Also read the introduction
        const formData = new FormData(SearchFormId);
        // formData.append('formPath', './FE/disComInfo.html')
        formData.append('formPath', `${formPath}`)
          
        //The Object.fromEntries() static method transforms a list of key-value pairs into an object.  
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
        //The Object.entries() static method returns an array of a given object's own enumerable string-keyed property key-value pairs.
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
         const plainFormData = Object.fromEntries(formData.entries());
         const formDataJsonString = JSON.stringify(plainFormData);
        // To validate the form inputs are not empty
        //
      
     
  var getInputFormElementsByType = getFormElementsByType('input' , 'text')
  if(validateForm(getInputFormElementsByType)) 
    {
          fetch("/searchComSubmit", {
                  method: "POST",
                  body: formDataJsonString,
                  },{ headers: { 'Content-Type': 'application/json'},
                  })
              .then(response => response.text()).then(function(data) {
					
                mainDiv.innerHTML = data;
              
                  })
// ============== Following is part of update company infoemation ===========================
                  .then(()=>{
              if (formPath === './FE/updComInfo.html')
              {
               /*   comDataBeforUpd = [];
                  comDataBeforUpd[0] = document.getElementById('ComType').value;
                 // allFormInputFeilds = document.getElementsByTagName("input");
                 allFormInputFeildsByType = getFormElementsByType('input' , 'text')
                //  console.log( allFormInputFeildsByType)
                  for(var i = 0; i <  allFormInputFeildsByType.length; i++){
                    comDataBeforUpd[comDataBeforUpd.length] = allFormInputFeildsByType[i].value
                      //console.log(allFormInputFeilds[i].value)
                  }
                  console.log(comDataBeforUpd) */
                
                var  comDataBeforUpd = getFormInputValues();
                console.log(comDataBeforUpd)


                  var  updateComForm = document.getElementById('updateComForm');
                  var  updateComBtn = document.getElementById('updateBtnId');
                    const formData = new FormData(updateComForm);
                   // const plainFormData = Object.fromEntries(formData.entries());
                   // const formDataJsonString = JSON.stringify(plainFormData);
                    updateComBtn.addEventListener("click", function(event){
                      event.preventDefault();
            var getInputFormElementsByType = getFormElementsByType('input' , 'text')
            if(validateForm(getInputFormElementsByType)) 
              {
                     
                      var  comDataAfterUpd = getFormInputValues();
                      var  sqlComTableFields = ['com_type', 'com_name', 'com_purpose', 'com_address', 'notes'];
                      var  comTableUpdFields ='';
                      console.log(comDataAfterUpd)
                      for(var i = 0 ; i< comDataAfterUpd.length; i++)
                        {
                          if (comDataAfterUpd[i] != comDataBeforUpd[i]) 
                            {
                              if (comTableUpdFields != '') 
                                  {
                                    comTableUpdFields = comTableUpdFields + ','
                                    comTableUpdFields = comTableUpdFields + 
                                                        `${sqlComTableFields[i]} = '${comDataAfterUpd[i]}'`

                                  }
                                  else
                                  {
                                    
                                    comTableUpdFields = comTableUpdFields + 
                                                        `${sqlComTableFields[i]} = '${comDataAfterUpd[i]}'`;
                                  }
                            }
                       }
                       console.log(comTableUpdFields)

                       if (comTableUpdFields.length===0)
                       {
                            mainDiv.innerHTML =`<div style="display: flex; flex-direction: row; 
                            align-items: center; 
                            justify-content: center; 
                            width:100%; margin: 0 auto;
                            color: green;">
                            <div>
                              <h1 id="Message" >  لم يتم ادخال اى تعديلات على بيانات الشريكة  </h1>
                                                                                      
                            </div>
                          </div `

                                  setTimeout(function(){
                                  changeContent('updCom');
                                }, 3000);
                       }
                       else {
                       /*
                        var formData = new FormData()
                       formData.append('tableName','company');
                       formData.append('columnAndValueString',`${comTableUpdFields}`);
                       formData.append('whereClo','com_name');
                       formData.append('whereValue',`${comDataAfterUpd[1]}`);
                       const plainFormData = Object.fromEntries(formData.entries());
                       const formDataJsonString = JSON.stringify(plainFormData);
                       */
                      var jsonFormat = `{"tableName":"company", "columnAndValueString":"${comTableUpdFields}",
                                          "whereClo":"com_name", "whereValue":"'${comDataAfterUpd[1]}'"}` 
                      fetch("./updateComInfo", 
                              { method: "POST",body:jsonFormat },
                              { headers: {'Content-Type': 'application/json'},}  //'multipart/form-dat'    
                            )
                        .then(response => response.text()).then(function(data) {
                          
                              mainDiv.innerHTML =`<div style="display: flex; flex-direction: row; 
                                                            align-items: center; 
                                                            justify-content: center; 
                                                            width:100%; margin: 0 auto;
                                                            color: green;">
                                                            <div>
                                                              <h1 id="Message" >${data}</h1>
                                                                                                                      
                                                            </div>
                                                          </div  `
               
                                        setTimeout(function(){
                                        changeContent('updCom');
                                      }, 2000);
                                        
                                      // <input name="q" autofocus />
                            
                                      document.getElementById("Message").focus();
                           
                            

                                })
                                .catch((err) => {
                
                                  console.log('\n This is an Error Messag /updateComInfo \n',err);
                                });
                
                              }
                              }
                    })
                  }
                  })
                
  //=========================== End of upfdate company informatiopn ============================================               
                 /* 
                     .then(()=>{
                      console.log('Hello')
                      inputArray = document.getElementsByTagName("input");
                      //console.log(inputArray[0].readonly)
                      setInputTextEnabled(inputArray)
                    })
                    */
                .catch((err) => {
                
                  console.log('\n This is an Error Messag searchComSubmit \n',err);
                });
        }
      }

//========================================================

function setInputTextEnabled(inputArray)
{
    
    for (var index = 0; index < inputArray.length; index++){
      console.log('Hello form remove attribute')
        if (inputArray[index].type = 'text'){
            inputArray[index].removeAttribute("readonly");
            console.log('Hello form remove attribute / Remove Attribute')
          }
      }
        
}
    

//========================================================

    
    var setFoucs = false;// What is this ? the variable is used by the validateForm

    function validateForm(arrOfInputId) 
    {
       // const arrOfInputId =["ComName","ComType","ComPurp","ComAddr","ComNote"]
        for(var i =0; i < arrOfInputId.length; i++) 
          {          
         // var input = document.getElementById(element);
          validateForm_01(arrOfInputId[i])
          }
        if (setFoucs === true)
                {
                  setFoucs = false;
                  return false;
                } 
          else{ 
              /*
              {
                fetch("/searchCom", 
                      {
                          method: "POST",
                        //  body: formDataJsonString,
                        }, 
                        {
                          headers: { 
                          //'Content-Type': 'multipart/form-data', 
                          'Content-Type': 'text/html' 
                                    },
                        }).then(response => response.text()).then(function(data) {
                                var mainDiv = document.getElementById('main');				
                                mainDiv.innerHTML = data;
                          });
                      };  */          
            return true}
        
    }
       // var input = document.getElementById("ComName");
        
        function validateForm_01(input) {
          var value = input.value;
          if(value.length>0){
            //Valid
            console.log("valid")
          //  input.value="";
          //  input.placeholder="Got it";
          //  clearOtherClasses(input);
          //  input.classList.add("green");
          
          }else{
            //Invalid
            console.log("Invalid")
            input.value="";
            clearOtherClasses(input);
            input.classList.add("red");
            if (setFoucs === false)
                {
                input.focus();
                setFoucs = true;
                } 
          }
        
        }
        function clearOtherClasses(element)
        {
            element.className="";
          }
  
          function onLoadBody() 
          {
             // alert("I am an alert box!");
              document.getElementById('Comtest').readOnly = true;
              }
          
          function  changeReadonly() 
          {
              document.getElementById('Comtest').readOnly = false;
          }
      
   /*==========================================================================*/
        // Add Event Listener to the button element
    /* 
        When our form’s upload button is clicked, 
        the Event Listener will trigger the "uploadFiles" function, 
        which is responsible for handling the file upload process, 
        including preparing the files for upload and sending them to the server. 
    */
    // The following statment create variable to work with upload form event.
    
   // const uploadButton = document.getElementById("uploadButton"); 
   // uploadButton.addEventListener("click", uploadFiles);

    // End of Event Listener of the button element with id attribute id="uploadButton"

    function uploadFiles(event) 
        {   alert("Hello");
            event.preventDefault();
            // First, we get the files that were selected
            const form = document.querySelector('#uploadForm');
            const fileInput = document.getElementById("fileInput");
          //  const outputBox = form.getElementById('result')

            const selectedFiles = fileInput.files; // put selected file in Array 
            // Second Check if any files are selected with some error-handling logic 
            // to cover the case of no files being selected.
                if (selectedFiles.length === 0) // check if there is files selected 
                    {
                    alert("Please select at least one file to upload.");
                    return;
                    } 

                else{  
            

        // Working with outputBox variabil which represent the result HTML element...
      // outputBox.querySelector('.file-name').textContent = selectedFiles[0].name;
      //  outputBox.querySelector('.file-size').textContent = `${(selectedFiles[0].size / 1024).toFixed(2)} KB`;
       // outputBox.querySelector('.upload-result').innerHTML = ` <i class="ph ph-circle-notch"></i> `;
      //  outputBox.style.display = 'flex';

            // Third Create a FormData object to store the form data
            const formData = new FormData(form);
            // Append each selected file to the FormData object
             //   for (let i = 0; i < selectedFiles.length; i++) 
              //      {
                 //   formData.append("files[]", selectedFiles[i]);
              //      }

            // Fourth Send the AJAX request using XMLHttpRequest
            const xhr = new XMLHttpRequest();
            xhr.open("POST","./addComToDB");
            xhr.upload.onprogress = (event) => {
                const progress = (event.loaded / event.total) * 100;
               // outputBox.querySelector('.progress').style.width = `${progress}%`;
            }

            xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                // Handle successful response from the server
                console.log('Files uploaded successfully!');
              //  alert("Files uploaded successfully!");
            //  outputBox.querySelector('.upload-result').innerHTML = `
            //  <span>${xhr.responseText}</span>
            //  <i class="ph ph-check-circle"></i>
            // `
                } else {
                // Handle error response from the server
                console.error('Failed to upload files.');
              //  alert("Error occurred during file upload. Please try again.");
              outputBox.querySelector('.upload-result').innerHTML = `
              <span>${xhr.responseText}</span>
              <i class="ph ph-x-circle"></i>
            `

                }
            }
            };
            xhr.send(formData);

                    } // End else

        }

    function renderFileList () {
      /*=======define variables to work dynamiclly with the form <div> with id "file-list-display"
               and display the name of selected files ======*/
      var fileListDisplay = document.getElementById('file-list-display');
      const fileInput = document.getElementById("fileInput");
      const imgPreview = document.getElementById("img-preview");
      
       // put selected file in Array 
            // Second Check if any files are selected with some error-handling logic 
            // to cover the case of no files being selected.
  
      fileListDisplay.style.display = 'flex';
      fileListDisplay.innerHTML = '';
      for (var i = 0; i < fileInput.files.length; i++) {
      var fileDisplayEl = document.createElement('p');
        fileDisplayEl.innerHTML = (i + 1) + ': ' + fileInput.files[i].name;
        fileListDisplay.appendChild(fileDisplayEl);
/*===================getImgData()====================*/
        // For Refrance on FileReader API read -- https://developer.mozilla.org/en-US/docs/Web/API/FileReader
        const fileReader = new FileReader();
        fileReader.readAsDataURL(fileInput.files[i]);
        fileReader.addEventListener("load", function () {
          var imgDisplayEl = document.createElement('img');
          imgPreview.style.display = "flex";
		//console.log(this.result)
          imgPreview.innerHTML += '<img src="' + this.result 
                                + '" style="width: 150px; height:150px;' 
                                + ' margin: 20px; border-radius: 5px; border: 1px solid #ccc;"/>';
          fileListDisplay.appendChild(imgDisplayEl);
        });

      };
      
    
    }  
    
    /*============================ Dropdown list function ======================================*/
    function changeContent(page) {
	var mainDiv = document.getElementById('main');

	switch (page) {
		case 'addCom':
		fetch("/addCom").then(response => response.text()).then(function(data) {
					
                    mainDiv.innerHTML = data;				
				  }).then(()=>{

            const uploadButton = document.getElementById("uploadButton"); 
            uploadButton.addEventListener("click", uploadFiles);
          })
			break;
		case 'updCom':
		fetch("/updCom").then(response => response.text()).then(function(data) {
				
                    mainDiv.innerHTML = data;
				  })
          .then(()=>{
            // console.log('You are in searchCom');
              fetch("/getColFromDB", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"colName":"com_name","tableName":"company"})
                }).then(Response => Response.json()).then((jsonObject)=>{               
                  // console.log(jsonObject)
                  var options = '';
                  var jsonArray = jsonObject;
                  for (var i = 0; i < jsonArray.length; i++) {
                    options += '<option value="' + jsonArray[i] + '" />';
                    // console.log(options)
                  }
                  document.getElementById('comNameList').innerHTML = options; 
                  

                  getComDataBTN = document.getElementById('SearchBtnId');
                  getComDataBTN.addEventListener("click", function(event){
                    formPath = './FE/updComInfo.html'
                    
                    searchComSubmit(event, formPath)
 
                  })
  
                })
               
                .catch((err) => {
                
                  console.log('\n This is an Error Messag /updCom getColFromDB \n',err);
                })
            })
            .catch((err) => {
                
              console.log('\n This is an Error Messag /updCom \n',err);
            })
			break;
		case 'delCom':
			fetch("/delCom").then(response => response.text()).then(function(data) {
				
                    mainDiv.innerHTML = data;
				  });
			break;
      case 'searchCom':
			fetch("/searchCom").then(response => response.text()).then(function(data) {
				
                    mainDiv.innerHTML = data;
				  })
          .then(()=>{
          // console.log('You are in searchCom');
            fetch("/getColFromDB", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({"colName":"com_name","tableName":"company"})
              }).then(Response => Response.json()).then((jsonObject)=>{               
                // console.log(jsonObject)
                var options = '';
                var jsonArray = jsonObject;
                for (var i = 0; i < jsonArray.length; i++) {
                  options += '<option value="' + jsonArray[i] + '" />';
                  // console.log(options)
                }
                document.getElementById('comNameList').innerHTML = options; 
                getComDataBTN = document.getElementById('SearchBtnId');
                getComDataBTN.addEventListener("click", function(event){
                  formPath = './FE/disComInfo.html'
                    
                  searchComSubmit(event, formPath)
                  
                })
                

              })
              .catch((err) => {
                
                console.log('\n This is an Error Messag : getColFromDB \n',err);
              })
          }).catch((err) => {
                
            console.log('\n This is an Error Messag /searchCom :\n',err);
          });
              
			break;
      case 'searchDoc':
			fetch("/searchDoc").then(response => response.text()).then(function(data) {
				
                    mainDiv.innerHTML = data;
				  })
          .then(()=>{
            // console.log('You are in searchCom');
              fetch("/getColFromDB", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"colName":"com_name","tableName":"company"})
                }).then(Response => Response.json()).then((jsonObject)=>{               
                  // console.log(jsonObject)
                  var options = '';
                  var jsonArray = jsonObject;
                  for (var i = 0; i < jsonArray.length; i++) {
                    options += '<option value="' + jsonArray[i] + '" />';
                    // console.log(options)
                  }
                  document.getElementById('comNameList').innerHTML = options;
                  const inputComName = document.getElementById('SearchComId');
                  inputComName.addEventListener("input", function(event){
                    if (jsonArray.includes(inputComName.value))
                    {
                      console.log(" Company Name has been selected : .....")
                      fetch("/getColFromDBJoinTables", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify({"friColName":"id","secColName":"name",
                                              "friTableName":"company","secTableName":"images",
                                              "friWhereClo":"com_name","secWhereClo":"company_id",
                                              "friWhereValue":`${inputComName.value}`})
                        })
                        .then(Response => Response.json())
                          .then((jsonObject)=>{
                            // document.getElementById('comNameList').innerHTML = options; 
                            console.log(jsonObject)
                            var options = '';
                            var jsonArray = jsonObject;
                            for (var i = 0; i < jsonArray.length; i++) {
                              options += '<option>' + jsonArray[i] + '</>';
                              // console.log(options)
                            }
                            console.log(options)
                            imagesSelect = document.getElementById('imagesSelectId');
                            imagesSelect.innerHTML = options;

                            })
                           .then(()=>{
                            getImagesBTN = document.getElementById('getImagesBTN');

                            getImagesBTN.addEventListener("click", function(event){
                            //console.log(imagesSelect.value);
                            const selectedOptions = [];

                            for (const option of imagesSelect.options) {
                              if (option.selected) {
                                selectedOptions.push(option.value);
                              }
                            }
                              // console.log(selectedOptions);
                             // ArrayToJson = JSON.stringify(selectedOptions);
                              console.log(selectedOptions);

                              fetch("/getImages", {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({"colName":"encode(image, 'base64')",
                                                        "tableName":"images",
                                                        "whereClo":"name",
                                                        "whereValue":selectedOptions})
                                })
                                .then(Response => Response.text()).then((jsonObject)=>{ 
                                    //console.log(jsonObject)
                                    imagesToDisplay = document.getElementById('imagesToDisplay')
                                    imagesToDisplay.innerHTML = jsonObject;

                                  })
                                  .catch((err) => {
                
                                    console.log('\n This is an Error Messag /getImages :\n',err);
                                  })
                                  
                                    })
                  
                           })
                           .catch((err) => {
                
                            console.log('\n This is an Error Messag /getColFromDBJoinTables : \n',err);
                          })


                    }
                  
                  })
  
                })
                .catch((err) => {
                
                  console.log('\n This is an Error Messag /getColFromDB :\n',err);
                })

            })
            .catch((err) => {
                
              console.log('\n This is an Error Messag /searchDoc : \n',err);
            })
             /*.then(()=>{

              document.getElementById('comNameList').innerHTML = options; 

            })*/
			break;
      case 'createDB':
      fetch("/createDB").then(response => response.text()).then(function(data) {
				
        mainDiv.innerHTML = data;
          })
          .catch((err) => {
                
            console.log('\n This is an Error Messag /createDB \n',err);
          });
      break;

		default:
			contentDiv.innerHTML = '<h2>Page not found!</h2>';
	}
}
   

