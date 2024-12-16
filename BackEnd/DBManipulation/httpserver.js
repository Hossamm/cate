
// Import NPM package
const http = require('http');
const url = require('url');
const fs = require('fs'); 
const busboy = require('busboy')

// Import user packages 
const conntoPgDB = require('./conntoPgDB.js');
const getFormInputData = require('./getFormInputData.js');

// ========================================

 workWithPgDB = new conntoPgDB()
   
// الحمد لله 
async function insertCompData(companyValues, photoValues) {
  await workWithPgDB.conntodb();
  return  await workWithPgDB.insertRec(companyValues, photoValues);
}
// الحمد لله  

//==========================================

const hostname = 'localhost'
const port = 3000
server = http.createServer(function (request, response) {

   const FormInputData = new getFormInputData(request,response)
        
    var path = request.url;
    switch (path) { 

        case '/':  
        var path = '/';

                     
            if (request.method === 'POST') {
//==================================================================================================
   console.log('POST request');

    FormInputData.getFormInputs(request, response)
    .then((data) => 
        {
       var fields = data[0]
       var filenames = data[1]
       var allFiles = data[2]
      
    
       console.log('Number of form input fields : ' , Object.keys(fields).length )
       console.log('Number of uploaded files using files names : ' , filenames.length )
       console.log('Number of uploaded files using Data files : ' , allFiles.length )
       console.log( 'Field value : ', (fields.fName) ) // => get Fields values
       console.log( 'Field value : ', (fields.lName) ) // => get Fields values
       console.log('Name of the first file : ' , filenames[0])
       console.log('Name of the first file : ' , filenames[1])
       console.log('Name of the first file : ' , filenames[2])


// write allFiles ================================================
       
       allFiles.forEach( (element, index) => {
        fs.writeFile(`./${filenames[index]}`, allFiles[index], (err) => {
            
            if (err) {
                        throw new Error('Something went wrong.')
                     }
            console.log(`the -  ${filenames[index]} - file has been writen`);
                                                            })
            console.log('element.length : ',element.length)
            
                                    });
//End Write File =================================================

// Starting of insert Data and response to Client - Company Data and Number of photos uploaded  ========
                    

var companyValues = []
for (let x in fields) {
   companyValues.push( fields[x]);
};


console.log('Company Fields value : ' + companyValues)
var photoValues = []
for (let i = 0; i < allFiles.length; i++) {
   console.log((allFiles[i].length))
    photoValues.push([filenames[i],allFiles[i]])   
}

// console.log('Company photo name and files :' , photoValues )
                    
                   insertCompData(companyValues, photoValues).
                   then((processResult) =>{
                        console.log(' response.write :  ',processResult)
                         response.write(processResult)
                         response.end()
                   })
                                     
              

// End of insert Data and response to Client - Company Data and Number of photos uploaded  ========


    })
    
 
    // getFormInputs(request,response)
              
/*
.then((fileData)=>{ 
//==============================================================================================
                console.log('Company Name : ' + fileData[2][0].name)
                console.log('Note : ' + fileData[2][1].name) 
                request.on('end', function() {

                
                    fs.writeFile(`./${fileData[1]}`, fileData[0], (err) => {
                        if (err) {
                            throw new Error('Something went wrong./' + err)
                        }

                    })



                var values = [ 
                                 [ fileData[1], fileData[0]], 
                             ]


          
                        try {                           
                         conntosql.insertRec(con,values,fileData[2][0].name,fileData[2][1].name);
                        //  conntosql.selectRec(con)
                                } catch (err) {
                                    console.error(err);
                                    response.write(err)
                                    response.end()    
                                }
        
                response.write('File uploaded successfully  تم التحميل بنجاح')
                response.end()
                })    
            })  End of then() */ 

                } else {
                    console.log('GET')
                    var html = `
                            <html>
                                <body>
                                    <form method="post" action="http://localhost:3000">Name: 
                                        <input type="text" name="name" />
                                        <input type="submit" value="Submit" />
                                    </form>
                                </body>
                            </html>`
                    response.writeHead(200, {'Content-Type': 'text/html'})
                    response.end(html)
                }

            break;  
            case '/uploadmorefile.html': 
                console.log(' uploadfile.html page has been loaded....') 
                fs.readFile(__dirname + path, function(error, data) {  
                    if (error) {  
                        response.writeHead(404);  
                        response.write(error);  
                        response.end();  
                    } else {  
                        response.writeHead(200, {  
                            'Content-Type': 'text/html', 
                        });  
                        response.write(data);  
                        response.end();  
                    }  
                });  
                break;
                case '/uploadfile.html': 
                console.log(' uploadfile.html page has been loaded....') 
                fs.readFile(__dirname + path, function(error, data) {  
                    if (error) {  
                        response.writeHead(404);  
                        response.write(error);  
                        response.end();  
                    } else {  
                        response.writeHead(200, {  
                            'Content-Type': 'text/html', 
                        });  
                        response.write(data);  
                        response.end();  
                    }  
                });  
                break;
                default:  
                response.writeHead(404);  
                response.write("opps this doesn't exist - 404");  
                response.end();  
                break; 

    }


    
})
//.listen(3000,  () => {
//    console.log(`Server running at http://${hostname}:${port}/`)
//  });
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/uploadmorefile.html`)
                                                    
  })



  async function getFormInputs(request,response)
  {

  const busboyObj = busboy({ headers: request.headers , defParamCharset : 'utf8'});
  let uploadedBytes = 0;
  let fname = ''
  let fields = []
  let combinedBuffer = ''
  // use fs.createWriteStream function to read chunk 
  //    const output = fs.createWriteStream('/home/hossam/bufferfile'); 
      busboyObj.on('file', (name, file, info) => 
  {
      console.log('Start --------------')
// file.pipe(fs.createWriteStream('/home/admin/node_Apps/saved/xxx'));
  const { filename, encoding, mimeType } = info;
  fname = filename;
  console.log('Info Attribute : ', info)
  console.log(
      `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType );
  file.on('data', (chunk) => {
  
// Hossam             console.log(`File [${name}] got ${chunk.length} bytes`);

      uploadedBytes += chunk.length;
  //                      alldata += chunk;
  //     use fs.createWriteStream function to read chunk   
  //     output.write(chunk);
      
      function con(chunk){
          if (!combinedBuffer) {combinedBuffer = chunk} 
          else {combinedBuffer = Buffer.concat([combinedBuffer, chunk]);
          }   
          return combinedBuffer; 
      }
  combinedBuffer = con(chunk)
          
  }).on('close', () => {
      
      console.log(`File [${name}] Size is : ${combinedBuffer.length} / ${uploadedBytes} done`);
  //    output.end();
    
  });
  }); 


  i = 0
  busboyObj.on('field',(name, val, info) => {
      console.log(info)
  console.log(`Field [${name}]: value: %j`, val);
  fields[i] = { name : val }
  i = i+1    
  });


  busboyObj.on('close',() => {
  console.log(fields)    
  console.log('Done parsing form!');
  // return ([getFileData,filename,fields]) 
  //                        response.writeHead(303, { Connection: 'close', Location: '/' });
                            response.write(`File uploaded successfully  تم التحميل بنجاح ${fname}
                            \n File [${fname}] Size is : ${combinedBuffer.length} / ${uploadedBytes} done \n\n`)
                            response.end();
  });

  request.pipe(busboyObj); 

  /*                    
  Definition

      We can define the pipe based on the Linux article page is shown below:

      A pipe is a form of redirection used in Linux and other Unix based operating systems 
      to send the output of one program to another program for further processing.

      The pipe function can be defined as a function that accepts a series of functions 
      that process an input parameter and return an output that will be considered to be 
      the input of the next function. 
      https://www.naukri.com/code360/library/pipe-function-in-javascript

  */
      

 } 
 // End of promise method busboy bakage - New async function




