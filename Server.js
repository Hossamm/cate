const http = require('http')
var url = require('url');
var fs = require('fs');
// Host Info
const hostname = 'localhost';
const port = 3000;
// Import user packages 
const conntoPgDB = require('./BackEnd/DBManipulation/conntoPgDB.js');
const getFormInputData = require('./BackEnd/DBManipulation/getFormInputData.js');

// ========================================

workWithPgDB = new conntoPgDB()  
// الحمد لله 
async function insertCompData(companyValues, photoValues) {
  await workWithPgDB.conntodb();
  return  await workWithPgDB.insertRec(companyValues, photoValues);
}
// الحمد لله  

//==========================================

	
//===========================================
const updateForm   = require('./Control/updateForm.js');
const selectFromDB = require('./Control/selectFromDB.js');
//const { console } = require('inspector');

    const updateFormObj = new updateForm()
	const selectFromDBObj = new selectFromDB()
//===========================================


	const server = http.createServer((req, res) => {

		req.on('error', err => {
			console.error(err);
			res.statusCode = 400;
			res.end();
		  });
		  res.on('error', err => {
			console.error(err);
		  });

		 // var path = url.parse(req.url).pathname;
			var path = req.url;
		const FormInputData = new getFormInputData(req,res)
		switch (path) { 
			case '/addComToDB': 
			// Start the case 
			 if (req.method === 'POST') {
			//==================================================================================================
			   console.log('POST request');
			
				FormInputData.getFormInputs(req, res)
				.then((data) => 
					{
				   var fields = data[0]
				   var filenames = data[1]
				   var allFiles = data[2]
			
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
				photoValues.push([allFiles[i],filenames[i]])   
			}
			
			// console.log('Company photo name and files :' , photoValues )
								
							   insertCompData(companyValues, photoValues).
							   then((processResult) =>{

									console.log(' res.write :  ', processResult)
									 res.writeHead(200, {  
										'Content-Type': 'text/html'  // or 'Content-Type':'application/json'
									});  
									res.write(processResult);  
									res.end();
							   })
			// End of insert Data and response to Client - Company Data and Number of photos uploaded  ========
				})
				
			
					}  
			// End of the case  
			break;
	
			case '/index.html': 
			// read file code ..
			fs.readFile(process.cwd() + path,'utf8',function(error, data) {  
			if (error) {  
				res.writeHead(404); 
				res.write('Error Message Code'+ res.statusCode +'\n'+ error); 
				res.end();  
			} else {
			// write the res...
							   
			   res.writeHead(200, {  
					'Content-Type': 'text/html'  // or 'Content-Type':'application/json'
				});  
				res.write(data);  
				res.end(); 
			}  
			}); 
			// End read file code  
			break;
			case '/mainPage.html': 
			// read file code ..
			fs.readFile(process.cwd() + path,'utf8',function(error, data) {  
			if (error) {  
				res.writeHead(404); 
				res.write('Error Message Code'+ res.statusCode +'\n'+ error); 
				res.end();  
			} else {
			// write the res...
							   
			   res.writeHead(200, {  
					'Content-Type': 'text/html'  // or 'Content-Type':'application/json'
				});  
				res.write(data);  
				res.end(); 
			}  
			}); 
			// End read file code  
		    break; 
			case '/logo.png': 
			// read file code ..
		
			fs.readFile(process.cwd() + path,function(error, data) {  
			if (error) {  
				res.writeHead(404); 
				res.write('Error Message Code'+ res.statusCode +'\n'+ error); 
				res.end();  
			} else {
			// write the res...
							   
			   res.writeHead(200, {  
					'Content-Type': 'image/png', 'Content-Length': '', 
					'Access-Control-Allow-Origin': '*' // or 'Content-Type':'application/json'
				});  
				res.write(data);  
				res.end(); 
			}  
			}); 
			// End read file code  
		    break;
			case '/logo.svg': 
			// read file code ..
			
			fs.readFile(process.cwd() + path,function(error, data) {  
			if (error) {  
				res.writeHead(404); 
				res.write('Error Message Code'+ res.statusCode +'\n'+ error); 
				res.end();  
			} else {
			// write the res...
							   
			   res.writeHead(200, {  
					'Content-Type': 'image/svg+xml', 'Content-Length': '', 
					'Access-Control-Allow-Origin': '*' // or 'Content-Type':'application/json'
				});  
			
				res.write(data);  
				res.end(); 
			}  
			}); 
			// End read file code  
		    break;   
        	case '/script.js': // replace 'BackEnd/createDB/DBObject.js' by ''
			// read file code ..
			fs.readFile(process.cwd() + path,'utf8',function(error, data) {  
				if (error) {  
					res.writeHead(404); 
					res.write('Error Message Code'+ res.statusCode +'\n'+ error); 
					res.end();  
				} else {
				// write the res...
								   
				   res.writeHead(200, {  
						'Content-Type': 'text/javascript'  // or 'Content-Type':'application/json'
					});  
					res.write(data);  
					res.end(); 
				}  
				}); 
				// End read file code
			break;
			case '/style.css':
			// read file code ..
			fs.readFile(process.cwd() + path,'utf8',function(error, data) {  
				if (error) {  
					res.writeHead(404); 
					res.write('Error Message Code'+ res.statusCode +'\n'+ error); 
					res.end();  
				} else {
				// write the res...
								   
				   res.writeHead(200, {  
						'Content-Type': 'text/css'  // or 'Content-Type':'application/json'
					});  
					res.write(data);  
					res.end(); 
				}  
				}); 
				// End read file code
			break;
			case '/createDB': // replace 'BackEnd/createDB/DBObject.js' by ''
			// read file code ..
			try{
			 const DB = require('./BackEnd/createDB/DBObject.js');
			 DB.setupAppDB();

				res.writeHead(200, {  
				'Content-Type': 'text/javascript'  // or 'Content-Type':'application/json'
				});  
				res.write('Data Base has been created '+ res.statusCode);  
				res.end(); 
				}
			catch(error)
			 	{  
				res.writeHead(404); 
				res.write('Data Base not created '+ res.statusCode +'\n'+ error); 
				res.end();  
				} 
				
				// End read file code
			break;  
			case '/addCom':
			// read file code ..
			fs.readFile(process.cwd() +'/FE/addCom.html','utf8',function(error, data) {  
				if (error) {  
					res.writeHead(404); 
					res.write('Error Message Code'+ res.statusCode +'\n'+ error); 
					res.end();  
				} else {
				// write the res...
								   
				   res.writeHead(200, {  
						'Content-Type': 'text/html'  // or 'Content-Type':'application/json'
					});  
					res.write(data);  
					res.end(); 
				}  
				}); 
				// End read file code
			break; 
			case '/updCom':
			// read file code ..
			fs.readFile(process.cwd() +'/FE/updCom.html','utf8',function(error, data) {  
				if (error) {  
					res.writeHead(404); 
					res.write('Error Message Code'+ res.statusCode +'\n'+ error); 
					res.end();  
				} else {
				// write the res...
								   
				   res.writeHead(200, {  
						'Content-Type': 'text/html'  // or 'Content-Type':'application/json'
					});  
					res.write(data);  
					res.end(); 
				}  
				}); 
				// End read file code
			break; 
			case '/delCom':
			// read file code ..
			fs.readFile(process.cwd() +'/FE/delCom.html','utf8',function(error, data) {  
				if (error) {  
					res.writeHead(404); 
					res.write('Error Message Code'+ res.statusCode +'\n'+ error); 
					res.end();  
				} else {
				// write the res...
								   
				   res.writeHead(200, {  
						'Content-Type': 'text/html'  // or 'Content-Type':'application/json'
					});  
					res.write(data);  
					res.end(); 
				}  
				}); 
				// End read file code
			break;   
			case '/searchComSubmit':
			//
			if (req.method === 'POST') 
				{
					var body = ''
					req.on('data', function(data) {
					body += data
					// console.log('Partial body: ' + body)
					})
					req.on('end', function() {
					console.log('Body: ' + body )
					// Working with DATABASE
					sqlRecord = JSON.parse(body);
					console.log(sqlRecord)
					console.log(' This the sqlRecord field : ' , sqlRecord.formPath)
					updateFormObj.mainfunction(sqlRecord.Companyname,sqlRecord.formPath)
						.then((updatedHTMLFile)=>{
							res.writeHead(200, {  
								'Content-Type': 'text/html'  // or 'Content-Type':'application/json'
							});  
							res.write(updatedHTMLFile);  
							res.end(); 
						})
					})
				}

				// End case
			break;      
			case '/searchDoc':
			// read file code ..
			fs.readFile(process.cwd() +'/FE/searchDoc.html','utf8',function(error, data) {  
				if (error) {  
					res.writeHead(404); 
					res.write('Error Message Code'+ res.statusCode +'\n'+ error); 
					res.end();  
				} else {
				// write the res...
								   
				   res.writeHead(200, {  
						'Content-Type': 'text/html'  // or 'Content-Type':'application/json'
					});  
					res.write(data);  
					res.end(); 
				}  
				}); 
				// End read file code
			break;
			case '/searchCom':
			// read file code ..
			fs.readFile(process.cwd() +'/FE/searchCom.html','utf8',function(error, data) {  
				if (error) {  
					res.writeHead(404); 
					res.write('Error Message Code'+ res.statusCode +'\n'+ error); 
					res.end();  
				} else {
				// write the res...
								   
				   res.writeHead(200, {  
						'Content-Type': 'text/html'  // or 'Content-Type':'application/json'
					});  
					res.write(data);  
					res.end(); 
				}  
				}); 
				// End read file code
			break;
			case '/getColFromDB':
				if (req.method === 'POST') 
					{
						var body = ''
						req.on('data', function(data) {
						body += data
						// console.log('Partial body: ' + body)
						})
						req.on('end', function() {
						console.log('Body: ' + body )
						// ==== ==== ==== Working with DATABASE ==== ==== ====
						 sqlParm = JSON.parse(body);
						 console.log(' This the sqlRecord field : ' , sqlParm.colName + " / " +sqlParm.tableName)
						selectFromDBObj.selectOneCol(sqlParm.colName,sqlParm.tableName)
							.then((selectResult)=>{
								// console.log(selectResult.rows)
				// ==== ==== ==== Change selectResult.rows Objects to Array of Object's value  ==== ==== ==== 
								var	arrayOfSelectedFiles=[]
								for(i=0;i<selectResult.rows.length;i++)
									{
								 		arrayOfSelectedFiles[i] = selectResult.rows[i].com_name;
									} 
								// console.log(arrayOfSelectedFiles)
								ArrayToJson = JSON.stringify(arrayOfSelectedFiles)
								// console.log(ArrayToJson)
								res.writeHead(200, {  
									'Content-Type':'application/json'  // or 'Content-Type': 'text/html' 
								});  
								res.write(ArrayToJson);  
								res.end(); 
							})
						})
					}

			
				// End read file code
			break;
			case '/getColFromDBWhere':
				console.log('-------------------You are in misstak -------------------------')
				if (req.method === 'POST') 
					{
						var body = ''
						req.on('data', function(data) {
						body += data
						// console.log('Partial body: ' + body)
						})
						req.on('end', function() {
						console.log('Body: ' + body )
						// ==== ==== ==== Working with DATABASE ==== ==== ====
						 sqlParm = JSON.parse(body);
						// console.log(' This the sqlRecord field : ' , sqlParm.colName + " / " +sqlParm.tableName)
						selectFromDBObj.selectOneColWhere(sqlParm.colName,sqlParm.tableName,sqlParm.whereClo,sqlParm.whereValue)
		
							.then((selectResult)=>{
								// console.log(selectResult.rows)
				// ==== ==== ==== Change selectResult.rows Objects to Array of Object's value  ==== ==== ==== 
								var	arrayOfSelectedFiles=[]
								for(i=0;i<selectResult.rows.length;i++)
									{
								 		arrayOfSelectedFiles[i] = selectResult.rows[i].com_name;
									} 
								// console.log(arrayOfSelectedFiles)
								ArrayToJson = JSON.stringify(arrayOfSelectedFiles)
								// console.log(ArrayToJson)
								res.writeHead(200, {  
									'Content-Type':'application/json'  // or 'Content-Type': 'text/html' 
								});  
								res.write(ArrayToJson);  
								res.end(); 
							})
						})
					}
				// End The Case
			break; 
			case '/getColFromDBJoinTables':
			// console.log('------- Hello you are in getColFromDBJoinTables ------')
				if (req.method === 'POST') 
					{
						var body = ''
						req.on('data', function(data) {
						body += data
						// console.log('Partial body: ' + body)
						})
						req.on('end', function() {
						console.log('Body: ' + body )
						// ==== ==== ==== Working with DATABASE ==== ==== ====
						 sqlParm = JSON.parse(body);
					// console.log('================================' + sqlParm.friWhereValue)
					// console.log(' This the sqlRecord field : ' , sqlParm.colName + " / " +sqlParm.tableName)
					//	selectFromDBObj.selectOneColWhere(sqlParm.colName,sqlParm.tableName,sqlParm.whereClo,sqlParm.whereValue)
						selectFromDBObj.selectOneColFromJoinTables(sqlParm.friColName,sqlParm.secColName,
																	sqlParm.friTableName,sqlParm.secTableName,
																	sqlParm.friWhereClo,sqlParm.secWhereClo,
																	sqlParm.friWhereValue)
		
							.then((selectResult)=>{
							//	console.log(selectResult)
				// ==== ==== ==== Change selectResult.rows Objects to Array of Object's value  ==== ==== ==== 
								var	arrayOfSelectedFiles=[]
								for(i=0;i<selectResult.rows.length;i++)
									{
								 		arrayOfSelectedFiles[i] = selectResult.rows[i].name;
									} 
								// console.log(arrayOfSelectedFiles)
								ArrayToJson = JSON.stringify(arrayOfSelectedFiles)
								// console.log(ArrayToJson)
								res.writeHead(200, {  
									'Content-Type':'application/json'  // or 'Content-Type': 'text/html' 
								});  
								res.write(ArrayToJson);  
								res.end(); 
							})
						})
					}

			
				// End read file code /getImages
			break;
			case '/getImages':
			// console.log('------- Hello you are in getColFromDBJoinTables ------')
				if (req.method === 'POST') 
					{
						var body = ''
						req.on('data', function(data) {
						body += data
						// console.log('Partial body: ' + body)
						})
						req.on('end', function() {
						console.log('Body: ' + body )
						// ==== ==== ==== Working with DATABASE ==== ==== ====
						 sqlParm = JSON.parse(body);
					     //console.log('================================' + sqlParm.whereValue)
						// jsonToArray = JSON.stringify(sqlParm.whereValue)
					// console.log(' This the sqlRecord field : ' , sqlParm.colName + " / " +sqlParm.tableName)
							
						selectFromDBObj.selectOneColWhere(sqlParm.colName,sqlParm.tableName,sqlParm.whereClo,sqlParm.whereValue)	
							.then((selectResult)=>{
								//console.log(selectResult[0].rows[0])
								console.log(selectResult)
				// ==== ==== ==== Change selectResult.rows Objects to Array of Object's value  ==== ==== ==== 
				this.ComFiles = [];
				
				for(var i = 0; i<sqlParm.whereValue.length;i++ ) 
					{
				var comOneFile =  {name: sqlParm.whereValue[i],encode:selectResult[i].rows[0].encode};
				this.ComFiles[i] = comOneFile;
					}
				//console.log(ComFiles.length);
				//console.log(this.ComFiles[0].name)
				//console.log(this.ComFiles[0].encode)
				//console.log(this.ComFiles)
				updateFormObj.CreateURIForFiles(this.ComFiles).then((imagesHtmlTag)=>{
				//	console.log(imagesHtmlTag)
					//const imagesHtmlTag = URIFiles
					res.writeHead(200, {  
			    'Content-Type':'multipart/form-data' //'Content-Type':'application/json' or 'Content-Type': 'text/html'   
					});  
					res.write(imagesHtmlTag);  
					res.end(); 
				}) 
							})
						})
					}

			
				// End read file code 
			break;  
			case '/updateComInfo':
			//
		/*	if (req.method === 'POST') 
				{
				FormInputData.getFormInputs(req, res)
				.then((data) => 
					{
				   var fields = data[0]
				   var companyValues = []
			for (let x in fields) {
			   companyValues.push( fields[x]);
			};
			
			
			console.log('Company Fields value : ' + companyValues)
		*/

		if (req.method === 'POST') 
			{
				var body = ''
				req.on('data', function(data) {
				body += data
				// console.log('Partial body: ' + body)
				})
				req.on('end', function() {
				console.log('Body: ' + body )
				// ==== ==== ==== Working with DATABASE ==== ==== ====
				 sqlParm = JSON.parse(body);
 
			selectFromDBObj.updateTableRec(sqlParm.tableName,
												sqlParm.columnAndValueString,
												sqlParm.whereClo,sqlParm.whereValue)
								.then((updateResult )=>{

										console.log(updateResult)
										res.writeHead(200, {  
											'Content-Type': 'text/html'  // or 'Content-Type':'application/json'
										});  
										res.write( ' تم تعديل بيانات الشريكة بنجاح' );  
										res.end();

													})

				
				
		// function updateRec(tableName, columnAndValueString, whereClo, whereValue)
		// columnAndValueString = `first_name = 'MS', last_name = 'Dhoni'`
		// ${fieldName} = ${newValue}
			
				
				
				
				})
				}

			break;                                               
			default:  
				res.writeHead(404);  
				res.write("opps this doesn't exist - 404");  
				res.end();  
				break;  
		}  


		 
	})

	server.listen(port, hostname, () => {
	  console.log(`Server running at http://${hostname}:${port}/index.html`)
	})






