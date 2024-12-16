const http = require('http')
var url = require('url');
var fs = require('fs');
	 

	const hostname = 'localhost'
	const port = 5000


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

		switch (path) {  
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






