const busboy = require('busboy')


module.exports = class getFormInputData {

    constructor(request,response) {   
      //  this.fields = []
        this.fields = '{'
        this.allFiles = []
        this.filenames = []

        this.CombinedBuffer='';   
        this.uploadedBytes = 0;
	this.fileNameChange='';
	this.numberOfFiles=0;
	this.numberOfCloseLoop=0;
           }

 
     
  async getFormInputs(request,response)
  {
   return new Promise((resolve, reject) =>
        {
    this.busboyObj = busboy({ headers: request.headers , defParamCharset : 'utf8'});
    request.pipe(this.busboyObj); 
  // use fs.createWriteStream function to read chunk 
  //    const output = fs.createWriteStream('/home/hossam/bufferfile'); 
    this.busboyObj.on('file', (name, file, info) => 
        {

	console.log('========================================= : 1' + info.filename + this.numberOfFiles++ )
	


        // name includes => The name atrbutte in the HTML input tag like <input id="file" type="file" name="fileToUpload">
        // Info includes => { filename: 'حفظ', encoding: '7bit', mimeType: 'application/octet-stream' }
        this.filenames.push(info.filename)
        
        // Following Event / data Event Concatenate chunks data or buffers into one   
        file.on('data', (chunk) => { 
         // this.uploadedBytes += chunk.length;


            this.getFile(chunk,info.filename)
		

	    
		
  
        }).on('close', () => {
			
			this.numberOfCloseLoop++;
			if (this.numberOfCloseLoop === this.numberOfFiles)
			{
			console.log (' ========================================== : We are closing ..................' + this.fileNameChange )
			this.allFiles.push(this.CombinedBuffer); // getFile() are using for Concatenation 
			this.uploadedBytes += this.CombinedBuffer.length; 
			console.log(`File [${this.fileNameChange}] Size is : ${this.CombinedBuffer.length} / total uploaded bytes : ${this.uploadedBytes} done`);

			}
	
	

           
            
        });
        
        }); 


  this.busboyObj.on('field',(name, val, info) => {   

        if(this.fields  != '{') {this.fields = this.fields + ','}
        this.fields = this.fields + this.getFields(name,val) ;
        // '{"name":"John", "age":30, "car":null}'
        
  });


  this.busboyObj.on('close',() => {  

                this.fields = this.fields + '}'
                console.log('Done parsing form!');

                this.fields = JSON.parse(this.fields)
                console.log(this.fields)
  //                     
                          //  response.write(`File uploaded successfully  تم التحميل بنجاح ${this.filenames}
                          //  \n File [${this.fname}] Size is : ${(this.allFiles[0]).length} / ${this.uploadedBytes} done \n\n`)
                          //  response.end();
                return resolve([this.fields,this.filenames,this.allFiles])           
  })

  
  
  

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
        }) //End of promise method  

 } 
 // End of promise method busboy bakage - New async function


 // The following method is using to Concatenate chunks data or buffers into one file
 getFile(chunk,filename)
 	{

    if (!this.CombinedBuffer) {this.CombinedBuffer = chunk; this.fileNameChange = filename ; console.log (' ================================ : We are starting ....' + this.fileNameChange + filename )} 
    else if (this.fileNameChange === filename) {this.CombinedBuffer = Buffer.concat([this.CombinedBuffer, chunk]); console.log (' ================================ : File Not change ....')}
    else {
	    this.allFiles.push(this.CombinedBuffer); // getFile() are using for Concatenation 
            this.uploadedBytes += this.CombinedBuffer.length; 
            console.log(`File [${this.fileNameChange}] Size is : ${this.CombinedBuffer.length} / total uploaded bytes : ${this.uploadedBytes} done`);
	    this.CombinedBuffer = chunk;
	    this.fileNameChange = filename;
		
	 } 
}



// You can implement the following code 
// 1- if(this.fields  != '{') {this.fields = this.fields + ','}
// 2- this.fields = this.fields + this.getFields(name,val) ; 
//  to  this.busboyObj.on('field'... function and initialize this.fields = '{',  
// and add  this.fields = this.fields + '}' statment in this.busboyObj.on('close',() => { ...

getFields(name,val) {

    return ` "${name}"  : `+` "${val}" `

   // json format that I need '{"name":"John", "age":30, "car":null}'

} 
     




    }; // End of class


        // module.exports = conntosql ; 