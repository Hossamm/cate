const fs = require('fs');
const conntoPgDB = require('../BackEnd/DBManipulation/conntoPgDB.js');
                            
module.exports = class updateForm {
    constructor() { 
        this.workWithPgDB = new conntoPgDB();
        this.uri ='';
        this.formPath = './FE/disComInfo.html'; 
        this.comRec =[];
        this.allComData =[];
        this.updatedHTMLFile ='';
       
           }
        
       

async mainfunction(comName,formPath)
{
        await this.getComDataAndFiles(comName);
        await this.createComRec(this.allComData);
        await this.updateHTMLFile(formPath).then((HTMLfile)=>
            {if(HTMLfile instanceof TypeError)
            {
                console.log('Error in reading HTML file : ' + HTMLfile)
            }else
            {
                
                var  arr_var = [this.comRec[1], this.comRec[2], this.comRec[3],this.comRec[4],this.comRec[5], this.comRec[6],this.comRec[7]];
                var arr_val = ['com_value', 'type_value', 'prp_value','addrs_value','capital_value','other_value','xxxxxxxx']
                this.updateHTML(HTMLfile,arr_val,arr_var);
                //return this.updatedHTMLFile
                
            }
            })

         return this.updatedHTMLFile;
    }


async getComDataAndFiles(comName) 
        {

                await this.workWithPgDB.conntodb();   
                this.allComData= await this.workWithPgDB.getComData(comName);
       
         }


async createComRec(allComData)
        {
           // console.log(allComData)
         // Create an Array of Company's Data/Fields and its images/Files to update HTML page.
         // Company Data/Fields From comRec[0] to comRec[5].
         // Company images/Files is last element in comRec Array.
            this.comRec [0]= allComData[0][0].id;
            this.comRec [1]= allComData[0][0].com_name;
            this.comRec [2]= allComData[0][0].com_type;
            this.comRec [3]= allComData[0][0].com_purpose;
            this.comRec [4]= allComData[0][0].com_address;
            this.comRec [5]= allComData[0][0].com_capital;
            this.comRec [6]= allComData[0][0].notes;
            // The following Function return the HTML code / URI of the files to included in HTML page...
            this.comRec[7] = await this.CreateURIForFiles(allComData[1]);
    
            
            
        //	console.log('=================== Number of files ===================== : ( '+allComData[1].length)
        //  console.log('===================image data====================='+comRec[6].length)
        //	console.log('This is the out of Select statement files length/records: ' + allComData[1].length);
        //    console.log('This is the out of Select statement files: file Name of rec 1 is : ' + allComData[1][0].name);	
            
        }

async updateHTMLFile(formPath){
    
     return   fs.readFileSync(formPath,'utf8')                   
        }


async updateHTML(data,arr_var, arr_val)
    {
    for( let i=0; i<arr_var.length;i++) 
    { 
    	// console.log( arr_var[i] );
    	// console.log( arr_val[i] )            
        data =  data.replaceAll(arr_var[i], arr_val[i]);        
        }
        this.updatedHTMLFile = data; 
    }


async CreateURIForFiles(ComFiles)
    {
    // console.log('This the file Name from URI function : \n\n' , (ComFiles[0].name))
    // console.log('This the URI file from URI function : \n\n' , (ComFiles[0].encode))
    // This Function return the HTML code / URI of the files to included in HTML page...
         var data = '';
         //var excelicon = await this.toDataUri('./excelicon.jpg')
        
        // Get image file extension Explaination
            // The following links explain the use of String split() method and Array pip() Methos....
            // https://www.freecodecamp.org/news/javascript-split-how-to-split-a-string-into-an-array-in-js/
            // https://www.w3schools.com/jsref/jsref_pop.asp

    for(var i=0; i<ComFiles.length;i++)
    // for(i=0; i<1;i++)
        {
        const ext = (ComFiles[i].name).split('.').pop();
        /* use && || in switch case
        switch (pageid)
        {
            case "listing-page":
            case "home-page":
                alert("hello");
                break;
            case "details-page":
                alert("goodbye");
                break;
        }
        */
        switch (ext) 
        { 
            case 'pdf': 
            // console.log(ext);
            // complete data URI
            
            /*   this.uri = `<embed type="application/pdf" src="data:application/
                              ${ext};base64,${(ComFiles[i].encode)}"style="width: 300px; height: 500px; 
                             margin: 20px; border-radius: 5px; border: 1px solid #ccc;">`
            */
                             this.uri = `<br>
                            <a href="data:application/pdf;
                              base64,${(ComFiles[i].encode)}" download="${(ComFiles[i].name)}"> 
                
                            <img src="${ await this.toDataUri('./pdfIcon.jpg')}" 
                            style="width: 150px; height: 150px;	margin: 20px; 
                                    border-radius: 5px; border: 1px solid #ccc; " > 

                                    <p> ${(ComFiles[i].name)} </p>
                            </a>`
             
            break;
            case 'png':
                this.uri = `<img src="data:image/
                              ${ext};base64,${(ComFiles[i].encode)}"style="width: 300px; height: 300px; 
                             margin: 20px; border-radius: 5px; border: 1px solid #ccc;">`
            
            break;
            case 'gif':
                this.uri = `<img src="data:image/
                              ${ext};base64,${(ComFiles[i].encode)}"style="width: 300px; height: 300px; 
                             margin: 20px; border-radius: 5px; border: 1px solid #ccc;">`
            
            break;
            case 'jpg':
            case 'jpeg':
            case 'PNG':
            case 'JPG':    
                this.uri = `<img src="data:image/
                              ${ext};base64,${(ComFiles[i].encode)}"style="width: 300px; height: 300px; 
                             margin: 20px; border-radius: 5px; border: 1px solid #ccc;">`
            
            break;
            case 'svg':
                this.uri = `<img src="data:image/
                              svg+xml;base64,${(ComFiles[i].encode)}"style="width: 300px; height: 300px; 
                             margin: 20px; border-radius: 5px; border: 1px solid #ccc;">`
            
            break;
            // data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;
            case 'xlsx':
                this.uri = `<br>
                            <a href="data:application/vnd.ms-excel;
                             base64,${(ComFiles[i].encode)}" download="${(ComFiles[i].name)}"> 
                
                            <img src="${ await this.toDataUri('./excelicon.jpg')}" 
                            style="width: 100px; height: 100px;	margin: 20px; 
                                    border-radius: 5px; border: 1px solid #ccc; ">
                                    
                                    <p> ${(ComFiles[i].name)} </p>
                            </a>`
            //<p> هذا ملف اكسل. اضغط "Open Image in New Tap" لحفظ الملف و التعامل معه. </p>
            break;
            case 'xls':
                this.uri = `<br>
                            <a href="data:application/vnd.ms-excel;
                            base64,${(ComFiles[i].encode)}" download="${(ComFiles[i].name)}"> 
                
                            <img src="${ await this.toDataUri('./excelicon.jpg')}" 
                            style="width: 100px; height: 100px;	margin: 20px; 
                                    border-radius: 5px; border: 1px solid #ccc; ">
                                    
                                    <p> ${(ComFiles[i].name)} </p>
                            </a>`
            
            break;
            case 'doc':
                this.uri = `<br>
                              <a href="data:application/vnd.ms-excel;
                              base64,${(ComFiles[i].encode)}" download="${(ComFiles[i].name)}"> 
                
                            <img src="${ await this.toDataUri('./wordicon.jpg')}" 
                            style="width: 100px; height: 100px;	margin: 20px; 
                                    border-radius: 5px; border: 1px solid #ccc; "> 

                                    <p> ${(ComFiles[i].name)} </p>
                            </a>`
            
            break;
            case 'docx':
                this.uri = `<br>
                            <a href="data:application/vnd.ms-excel;
                              base64,${(ComFiles[i].encode)}" download="${(ComFiles[i].name)}"> 
                
                            <img src="${ await this.toDataUri('./wordicon.jpg')}" 
                            style="width: 100px; height: 100px;	margin: 20px; 
                                    border-radius: 5px; border: 1px solid #ccc; " > 

                                    <p> ${(ComFiles[i].name)} </p>
                            </a>`
            
            break;
            case 'mp3':
            case 'mp4':
                
                this.uri = `<embed src="data:application/
                            svg+xml;base64,${(ComFiles[i].encode)}"style="width: 300px; height: 300px; 
                            margin: 20px; border-radius: 5px; border: 1px solid #ccc;"> 
                            <p> هذا ملف ${ext} مدعوم من التطبيق. </p>`  
            break; 
            default: 
                this.uri = `<embed src="data:application/
                            svg+xml;base64,${(ComFiles[i].encode)}"style="width: 300px; height: 300px; 
                            margin: 20px; border-radius: 5px; border: 1px solid #ccc;"> 
                            <p> هذا ملف ${ext}.... </p>`  
            break;  
        }
        data = data + this.uri;
        this.uri = '';
    }
    //console.log(data)
    return data;
     
    }


// Create a function that takes an image path as a parameter
async toDataUri(imgPath) {
    // Read data
    const bitmap = fs.readFileSync(imgPath);

    // convert binary data to base64 encoded string
    const base64Image = Buffer.from(bitmap).toString('base64');

    // Get image file extension
    const ext = imgPath.split('.').pop();

    // complete data URI
    const uri = `data:image/${ext};base64,${base64Image}`;
    //console.log(uri)
    return uri;
}

}