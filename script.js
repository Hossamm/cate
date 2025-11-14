    
/*============================ Dropdown list function ======================================*/
    function changeContent(page) {
      var mainDiv = document.getElementById('main');
    
      switch (page) {
        case 'addCom':
        fetch("/server/addCom").then(response => response.text()).then(function(data) {
              
                        mainDiv.innerHTML = data;				
              }).then(()=>{
    
                
                //validateForm(getInputFormElementsByType)
                const uploadForm = document.getElementById("uploadForm"); 
               // uploadForm.addEventListener('submit', validateForm(getInputFormElementsByType) );
               uploadForm.addEventListener('submit', function(event){
                event.preventDefault();
                            // Remove any space from Company Name
                            //  var companyName = document.getElementById('ComName');
                            //  companyName.value = companyName.value.trim();
                            // ===== End of Remove space from company name ======
                        var getInputFormElementsByType = getFormElementsByType('input' , 'text')
                        getInputFormElementsByType.splice(1, 0, document.getElementById('ComType'))
                        validateForm(getInputFormElementsByType)
                         .then((validationResult)=>{
                          if (validationResult === true)
                               {
                                uploadFiles(event);
                                console.log(validationResult);
                               }                          
                        })             
                      }
                );
              })
          break;
        case 'updCom':
        fetch("/server/updCom").then(response => response.text()).then(function(data) {
            
                        mainDiv.innerHTML = data;
              })
              .then(()=>{
                // console.log('You are in searchCom');
                  fetch("/server/getColFromDB", {
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
                      
                      
                document.getElementById('SearchComId').addEventListener("input", function(event){
                        var comNameError = document.getElementById('comNameError')
                        comNameError.innerText = '';
                      })
                      
                      getComDataBTN = document.getElementById('SearchBtnId');
                      getComDataBTN.addEventListener("click", function(event){
                        event.preventDefault()
                        var inputComName = document.getElementById('SearchComId')
                      if (jsonArray.includes(inputComName.value)){
                        
                        formPath = './FE/updComInfo.html'
                        
                        searchComSubmit(event, formPath)
                      }
                      else {
                          var comNameError = document.getElementById('comNameError')
                              comNameError.innerText = ' اختر الاسم الصحيح من القائمة';
                           }
     
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
          fetch("/server/delCom").then(response => response.text()).then(function(data) {
            
                        mainDiv.innerHTML = data;
              })
              .then(()=>{
                // console.log('You are in searchCom');
                  fetch("/server/getColFromDB", {
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

                      document.getElementById('SearchComId').addEventListener("input", function(event){
                        var comNameError = document.getElementById('comNameError')
                        comNameError.innerText = '';
                      })
                      
                      getComDataBTN = document.getElementById('SearchBtnId');
                      getComDataBTN.addEventListener("click", function(event){
                        event.preventDefault()
                        var inputComName = document.getElementById('SearchComId')
                      if (jsonArray.includes(inputComName.value)){
                        
                        formPath = './FE/delComInfo.html'
                          
                        searchComSubmit(event, formPath) 
                      }
                      else {

                        var comNameError = document.getElementById('comNameError')
                        comNameError.innerText = ' اختر الاسم الصحيح من القائمة';
                      }                
                  
                      })
                
                    })
                    .catch((err) => {
                      
                      console.log('\n This is an Error Messag : getColFromDB \n',err);
                    })
                }).catch((err) => {
                      
                  console.log('\n This is an Error Messag /searchCom :\n',err);
                });
                  
          break;
          case 'searchCom':
          fetch("/server/searchCom").then(response => response.text()).then(function(data) {
            
                        mainDiv.innerHTML = data;
              })
              .then(()=>{
              // console.log('You are in searchCom');
                fetch("/server/getColFromDB", {
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
                    
                    document.getElementById('SearchComId').addEventListener("input", function(event){
                      var comNameError = document.getElementById('comNameError')
                      comNameError.innerText = '';
                    })
                    
                    getComDataBTN = document.getElementById('SearchBtnId');
                    getComDataBTN.addEventListener("click", function(event){
                      event.preventDefault()
                      var inputComName = document.getElementById('SearchComId')
                    if (jsonArray.includes(inputComName.value)){

                      formPath = './FE/disComInfo.html'
                        
                      searchComSubmit(event, formPath)
                    }
                    else { 
                      var comNameError = document.getElementById('comNameError')
                              comNameError.innerText = 'اختر الاسم الصحيح من القائمة';
                         }
                      
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
          
          fetch("/server/searchDoc").then(response => response.text()).then(function(data) {
            
                        mainDiv.innerHTML = data;
              })
              .then(()=>{
                   fetch("/server/getColFromDB", {
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
                      SearchDocForm = document.getElementById('SearchDocFormId')
                      document.getElementById('comNameList').innerHTML = options;
                      const inputComName = document.getElementById('SearchComId');

                      inputComName.addEventListener("input", function(event){
                        event.stopImmediatePropagation(); // Hossam
                        
                        if (jsonArray.includes(inputComName.value))
                          {
                          console.log(" Company Name has been selected : .....")
                          imagesToDisplay.innerHTML = "";
                          fetch("/server/getColFromDBJoinTables", {
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
                                if (jsonObject["rowCount"] === 0)  
                                {
                                  console.log('There is No Options for user to select ... : \n')
                                  imagesSelect = document.getElementById('imagesSelectId');
                                  imagesSelect.innerHTML = '<option disabled >' 
                                                            + ' لا توجد مستندات مسجلة لهذه الشريكة' + '</>';
                                }
                                else
                                {
                                // document.getElementById('comNameList').innerHTML = options; 
                                console.log('This is All the Documnet of the Company Entered...\n' + jsonObject)
                                var options = '';
                                var jsonArray = jsonObject;
                                for (var i = 0; i < jsonArray.length; i++) {
                                  options += '<option>' + jsonArray[i] + '</>';
                                  // console.log(options)
                                }
                                console.log('This  is All Options to display for user to select ... : \n' + options)
                                imagesSelect = document.getElementById('imagesSelectId');
                                imagesSelect.innerHTML = options;
                                }
                                })
                               .then(()=>{
                        // =================== view selected images =====================
                                getImagesBTN = document.getElementById('getImagesBTN');
    
                                getImagesBTN.addEventListener("click", function(event){
                                const imagesSelectName = document.getElementById('imagesSelectNameId');
                                console.log(imagesSelectName.value); 
                                const selectedOptions = [];
                               // selectedOptions[0] = imagesSelectName.value;
                               
                                if (imagesSelectName.value !=="") {
                                  selectedOptions[0] = imagesSelectName.value;
                                  // console.log(selectedOptions);
                                  ArrayToJson = JSON.stringify(selectedOptions);
                                  console.log(' This is the selected Options : \n' + ArrayToJson);
    
                                  var jsonFormat = `{"selectColName":"encode(image, 'base64')",
                                  "pKeyTableName":"company","fKeyTableName":"images",
                                  "pKeyClo":"id","fKeyClo":"company_id",
                                   "friWhereClo":"com_name", "friWhereValue":"${inputComName.value}",
                                   "secWhereClo":"name", "secWhereValue":${ArrayToJson}}` ;
    
                                  fetch("/server/getImagesWithNameAndId", {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: jsonFormat
                                    })
                                    .then(Response => Response.text()).then((jsonObject)=>{ 
                                        //console.log(jsonObject)
                                        imagesToDisplay = document.getElementById('imagesToDisplay')
                                        imagesToDisplay.innerHTML = jsonObject;
    
                                      })
                                      .catch((err) => {
                    
                                        console.log('\n This is an Error Messag /getImages :\n',err);
                                      })
                                    } else {alert(" يجب تحديد المستندا قبل الضغط على زر العرض....")}
                                        })

                            //======================== Delete Selected Images =======================================


                            delImagesBTN = document.getElementById('delImagesBTN');
    
                            delImagesBTN.addEventListener("click", function(event){
                            const imagesSelectName = document.getElementById('imagesSelectNameId');
                            //console.log(imagesSelect.value);
                            const selectedOptions = [];
                                          
                            if (imagesSelectName.value !=="") {
                              selectedOptions[0] = imagesSelectName.value;
                               console.log(selectedOptions);
                              ArrayToJson = JSON.stringify(selectedOptions);
                              console.log(' This is the selected Options : \n' + ArrayToJson);

                              var jsonFormat = `{"deleteColName":"image",
                              "pKeyTableName":"company","fKeyTableName":"images",
                              "pKeyClo":"id","fKeyClo":"company_id",
                               "friWhereClo":"com_name", "friWhereValue":"${inputComName.value}",
                               "secWhereClo":"name", "secWhereValue":${ArrayToJson}}` ;

                              fetch("/server/deleteImagesWithNameAndId", {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: jsonFormat
                                })
                                .then(Response => Response.text()).then((jsonObject)=>{ 
                                    //console.log(jsonObject)
                                    imagesToDisplay = document.getElementById('imagesToDisplay')
                                    imagesToDisplay.innerHTML = jsonObject;

                                  })
                                  .catch((err) => {
                
                                    console.log('\n This is an Error Messag /getImages :\n',err);
                                  })
                                } else {alert(" يجب تحديد المستندا قبل الضغط على زر الالغـاء....")}
                                    })
                            //============================End Delete selected images ======================== 

                            //============================ Start adding new images ======================== 
                            insImagesBTN = document.getElementById('insImagesBTN');
    
                            insImagesBTN.addEventListener("click", function(event){
                              event.stopImmediatePropagation(); // Hossam
                            // console.log('Hi You are in click event')
                              const docFileInput = document.getElementById("docFileInput");
                              docFileInput.addEventListener("change", function(event){
                                event.stopImmediatePropagation(); // Hossam
                                
                                 docFileInput.files 
                                  if ( docFileInput.files .length === 0) // check if there is files selected 
                                    {
                                    alert("Please select at least one file to upload.");
                                    return;
                                    } 
                                    else
                                    {
                                      const formData = new FormData();
                                      formData.append('comName', `${inputComName.value}`); // Hossam Get Company Name

                                      for (var i = 0; i < docFileInput.files.length; i++) 
                                          {
                                            const file = docFileInput.files[i]; 
                                           // append the file directly to a FormData
                                              formData.append('fieldName', file, file.name);

                                          }
                                     // console.log(formData);
                                           fetch("/server/insertImages", {
                                            method: "POST",
                                            body: formData,
                                          }).then(Response => Response.text()).then((jsonObject)=>{ 
                                            //console.log(jsonObject)
                                            imagesToDisplay = document.getElementById('imagesToDisplay')
                                            imagesToDisplay.innerHTML = jsonObject;})

                                    }
                                    })
                            })

                            //============================ End adding new images ======================== 
                               })
                               .catch((err) => {
                    
                                console.log('\n This is an Error Messag /getColFromDBJoinTables : \n',err);
                              })

                        }
                      
                      else {

                       imagesSelect = document.getElementById('imagesSelectId');
                        imagesSelect.innerHTML = '<option value="' + '' + '" />';

                        imagesSelect.innerHTML = '<option disabled style = "color : red;" >' 
                                                            + '  ادخل الاسم الصحيح  ' + '</>';
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
          fetch("/server/createDB").then(response => response.text()).then(function(data) {
            
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
       
/*============================ End of Dropdown list function ======================================*/

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
  console.log('This is the allFormInputByType', allFormInputFeildsByType)
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
          fetch("/server/searchComSubmit", {
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
                   updateComForm.addEventListener("submit", function(event){
                    event.preventDefault();
                    //
                    var getInputFormElementsByType = getFormElementsByType('input' , 'text')

                    validateForm(getInputFormElementsByType)
                    .then((validationResult)=>{
                      if (validationResult === true)
                      {
                     
                      var  comDataAfterUpd = getFormInputValues();
                      var  sqlComTableFields = ['com_type', 'com_name', 'com_purpose', 'com_address',"com_capital",'notes'];
                      var  comTableUpdFields ='';
                      var  comUpdsInJSONForm ='';
                      console.log(comDataAfterUpd)
                      for(var i = 0 ; i< comDataAfterUpd.length; i++)
                        {
                          
                          if (comDataAfterUpd[i] != comDataBeforUpd[i]) 
                            {
                              if (comTableUpdFields != '') 
                                  {
                                    // person = {name:"John", age:31, city:"New York"};
                                    comTableUpdFields = comTableUpdFields + ',';
                                    comTableUpdFields = comTableUpdFields + 
                                                        `${sqlComTableFields[i]} = '${comDataAfterUpd[i]}'`;

                                    comUpdsInJSONForm = comUpdsInJSONForm + ',';
                                    comUpdsInJSONForm = comUpdsInJSONForm +
                                                        `"${sqlComTableFields[i]}" : [ "${comDataAfterUpd[i]}", "${comDataBeforUpd[i]}"]`;


                                  }
                                  else
                                  {
                                    
                                    comTableUpdFields = comTableUpdFields + 
                                                        `${sqlComTableFields[i]} = '${comDataAfterUpd[i]}'`;
                                    
                                    comUpdsInJSONForm = '{' + comUpdsInJSONForm +
                                                        `"${sqlComTableFields[i]}" : [ "${comDataAfterUpd[i]}", "${comDataBeforUpd[i]}"]`;
                                  }
                            }
                       }
                      // console.log('Hossam',comTableUpdFields)

                       if (comTableUpdFields.length===0)
                       {
                            mainDiv.innerHTML =`<div style="display: flex; flex-direction: row; 
                            align-items: center; 
                            justify-content: center; 
                            width:100%; margin: 0 auto;
                            color: red;">
                            <div>
                              <h1 id="Message" >  لم يتم ادخال اى تعديلات على بيانات الشريكة  </h1>
                                                                                      
                            </div>
                          </div `

                                  setTimeout(function(){
                                  changeContent('updCom');
                                }, 3000);
                       }
                       else {
                       // Work on the updated fields to insert them in com_updates table
                       comUpdsInJSONForm = comUpdsInJSONForm +'}';
                      // console.log( 'Hossam' , comUpdsInJSONForm);
                      // console.log(Object.keys(JSON.parse(comUpdsInJSONForm)));

                       // Work on the comTableUpdFields to insert them in company table
                       /*
                        var formData = new FormData()
                       formData.append('tableName','company');
                       formData.append('columnAndValueString',`${comTableUpdFields}`);
                       formData.append('whereClo','com_name');
                       formData.append('whereValue',`${comDataAfterUpd[1]}`);
                       const plainFormData = Object.fromEntries(formData.entries());
                       const formDataJsonString = JSON.stringify(plainFormData);
                       */
                      var sqlUpdateComJSONForm = `{"tableName":"company", "columnAndValueString":"${comTableUpdFields}",
                                          "whereClo":"com_name", "whereValue":"'${comDataAfterUpd[1]}'"}`; 
                      var jsonFormat =`{"sqlUpdateComJSONForm":${sqlUpdateComJSONForm},"comUpdsInJSONForm":${comUpdsInJSONForm}}`;
                      fetch("./updateComInfo", 
                              { method: "POST",body:jsonFormat },
                              { headers: {'Content-Type': 'application/json'},}  //'multipart/form-dat'    
                            )
                        .then(response => response.text()).then(function(data) {
                              if (data === 'البيانات لم تعدل') 
                                {                         
                                  mainDiv.innerHTML =`<div style="display: flex; flex-direction: row; 
                                                            align-items: center; 
                                                            justify-content: center; 
                                                            width:100%; margin: 0 auto;
                                                            color: red;">
                                                            <div>
                                                              <h1 id="Message" >${data}</h1>
                                                                                                                      
                                                            </div>
                                                          </div>  `
                                } else {
                                  mainDiv.innerHTML =`<div style="display: flex; flex-direction: row; 
                                                            align-items: center; 
                                                            justify-content: center; 
                                                            width:100%; margin: 0 auto;
                                                            color: green;">
                                                            <div>
                                                              <h1 id="Message" >${data}</h1>
                                                                                                                      
                                                            </div>
                                                          </div  `

                                }
                                        setTimeout(function(){
                                        changeContent('updCom');
                                      }, 2000);
                                     
                                })
                                .catch((err) => {
                
                                  console.log('\n This is an Error Messag /updateComInfo \n',err);
                                });
                
                              }
                              } // End of if statmrnt of the return value of validation result
                              })// End of then of the return value of validation function 
                    })// End of in submit of update form
                  }
                  else if (formPath === './FE/delComInfo.html')
                    {
                      alert('Hello you are in Delete Company process :')

                    comNameForDel = document.getElementById('ComName').value;
                    console.log(comNameForDel)

                  var  deleteComBtn = document.getElementById('deleteBtnId');
                    
                   // const plainFormData = Object.fromEntries(formData.entries());
                   // const formDataJsonString = JSON.stringify(plainFormData);
                   deleteComBtn.addEventListener("click", function(event){
                      event.preventDefault();

                    //  alert('Hello you are in click Event of Delete Company process :')

                  if (confirm(" لتاكيد عملية الالغاء اضغط ( OK ) \n هام : لا يمكن استرجاع هذه البيانات بعد الالغاء")) 
                        {
                          console.log(' الغاء ');
                        //==========================
                        var jsonFormat = `{"pKeyTableName":"company","fKeyTableName":"images",
                                           "pKeyClo":"id","fKeyClo":"company_id",
                                            "whereClo":"com_name", "whereValue":"'${comNameForDel}'"}` 
                        fetch("./deleteComInfo", 
                                { method: "POST",body:jsonFormat },
                                { headers: {'Content-Type': 'application/json'},}  //'multipart/form-dat'    
                              )
                          .then(response => response.text()).then(function(data) {
                              console.log(data)
                          mainDiv.innerHTML =`<div style="display: flex; flex-direction: row; 
                                                        align-items: center; 
                                                        justify-content: center; 
                                                        width:100%; margin: 0 auto;
                                                        color: blue;">
                                                        <div>
                                                          <h1 id="Message" >${data}</h1>
                                                                                                                  
                                                        </div>
                                                      </div  `

                                    setTimeout(function(){
                                    changeContent('delCom');
                                  }, 2000);
                                
                            })
                            .catch((err) => {

                              console.log('\n This is an Error Messag /updateComInfo \n',err);
                            });

                  } else {
                          console.log('  عدم الغاء ');
                        //============================
                            mainDiv.innerHTML =`<div style="display: flex; flex-direction: row; 
                            align-items: center; 
                            justify-content: center; 
                            width:100%; margin: 0 auto;
                            color: red;">
                            <div>
                              <h1 id="Message" >  لم يتم الغاء بيانات الشريكة  </h1>
                                                                                      
                            </div>
                          </div `

                                  setTimeout(function(){
                                  changeContent('delCom');
                                }, 3000);
                      //=============================== 
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

    
    var setFoucs = false;// What is this ? the variable is used by the 
    // teForm

  async function validateForm(arrOfInputId) 
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
               return true
              }
        
    }
       // var input = document.getElementById("ComName");
        
        function validateForm_01(input) {
          //var value = input.value;
          // Remove any space from Company Name
          var value = input.value.trim();
          // ===== End of Remove space from company name =======
          // ==== Save the input element text color ====
            inputColor = input.color;
          //===== End ==================================
          if(value.length>0){
            //Valid
            console.log("valid")
          //  input.value="";
          //  input.placeholder="Got it";
            clearOtherClasses(input);
            input.classList.add(inputColor);
          
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
   
// Help Functio( uploadFiles -   ) 
/*====================Following is the functions those called by DropDwon list Function ============================*/


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
            // Remove any space from Company Name
            var companyName = document.getElementById('ComName');
            let valueWithOneSpace = companyName.value.replace(/\s\s+/g, ' ');
            companyName.value = valueWithOneSpace.trim();
            //companyName.value = companyName.value.trim();
            // ===== End of Remove space from company name =======
            // First, we get the files that were selected
            const form = document.getElementById('uploadForm');
            const fileInput = document.getElementById("fileInput");
            const outputBox = document.getElementById('result');
            
            const selectedFiles = fileInput.files; // put selected file in Array 
            // Second Check if any files are selected with some error-handling logic 
            // to cover the case of no files being selected.
              //  var getInputFormElementsByType = getFormElementsByType('input' , 'text')
              //  if(!validateForm(getInputFormElementsByType)) 
                //   { }
                     if (selectedFiles.length === 0) // check if there is files selected 
                    {
                    alert("Please select at least one file to upload.");
                    return;
                    } 
              //    }
                else{  
            

        // Working with outputBox variabil which represent the result HTML element...
         

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

          /*  xhr.upload.onprogress = (event) => {
                const progress = (event.loaded / event.total) * 100;
               // outputBox.querySelector('.progress').style.width = `${progress}%`;
            }*/

            xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
      //outputBox.querySelector('.file-name').textContent = selectedFiles[0].name;
      //outputBox.querySelector('.file-size').textContent = `${(selectedFiles[0].size / 1024).toFixed(2)} KB`;
       form.reset();
       document.getElementById('file-list-display').innerHTML='';
       document.getElementById("img-preview").innerHTML='';
       outputBox.querySelector('.upload-result').value = xhr.responseText
        //  `<span>${xhr.responseText}</span>`
      outputBox.style.display = 'flex';
                // Handle successful response from the server
                console.log(xhr.responseText); 
              //  alert("Files uploaded successfully!");
       outputBox.querySelector('.upload-result').innerHTML = `<span>${xhr.responseText}</span>`
            
                } else {
                // Handle error response from the server
                console.error('Failed to upload files.');
              //  alert("Error occurred during file upload. Please try again.");
            //  outputBox.querySelector('.upload-result').innerHTML = `<span>${xhr.responseText}</span>`
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


    function renderDataInTheTable(xxxxxxxxxxxx) {

      console.log('+++++++++===++++++++++++++++++++++==========++++++++++++++++++++++++++========+++++++')
      const mytable = document.getElementById("html-data-table");
      todos.forEach(todo => {
          let newRow = document.createElement("tr");
          Object.values(todo).forEach((value) => {
              let cell = document.createElement("td");
              cell.innerText = value;
              newRow.appendChild(cell);
          })
          mytable.appendChild(newRow);
      });
      }
    

