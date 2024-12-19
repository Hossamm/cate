const { Client } = require('pg');

module.exports = class conntoPgDB {
    constructor(dbName) {
        this.conn = new Client({
                   user: 'postgres',
                   password: 'postgres',
                   host: 'localhost',
                   port: '5432',
                   database: 'catedb',
               });
       // this.dbStatus = 'notExists' //  'Exists' if dbName exists in PG db, 'notExists' if not      
           }
  




   async conntodb () // connect to DB function
    { 
    
  return await this.conn.connect()
        .then(() => { 
            console.log('Connected to PostgreSQL nodedb DB');
        })
        .catch((err) => {
            console.error('Error connecting to nodedb DB', err); 
        })
                   
    }

async  closeconn() // End DB connection
{

     return await this.conn
                .end()
                .then(() => {
                    console.log('Connection to nodedb DB closed');
                })
                .catch((err) => {
                    console.error('Error closing nodedb DB connection', err);
                });


}

 // function insertRec
 async insertRec(companyValues, photoValues) 
 {  
// Insert more than one row in table   
  var companysql = 'INSERT INTO company(com_name, com_type, com_purpose, com_address, notes) VALUES ($1, $2, $3, $4, $5)'
  var photosql = 'INSERT INTO images (company_id, image, name) VALUES ($1, $2, $3)'; 

// Insert new Company recors in Company Table 
return await this.conn.query(companysql,companyValues)
    .then((result) =>
        {  
            if (result instanceof Error) 
                {console.log('Company data not inserted Error: ', result);}

            else{
             console.log("Number of records inserted in Company Table: " + result.rowCount)
              return this.conn.query(`select id from company where com_name = '${companyValues[0]}'`)
            }
        })
    .then((result) =>
        {   
            console.log(`Selected row from Companty table where Company name is ${companyValues[0]}: `, result.rowCount)

                if (result instanceof Error) 
                    {console.log('Company data not inserted Error: ', result);}
                else{
                        // Add the new Company id to the photos records
                        for (let i = 0; i < photoValues.length; i++) 
                            {
                                photoValues[i].unshift(result.rows[0].id)          
                            } 
                              //   console.log(photoValues)
                        // Insert photos records in photo table using Arry.reduce mothod...
                      return photoValues.reduce(
                        (p, element) => 
                            p.then(() => this.conn.query(photosql,element)
                                // delete the next line only with keeping the , when you use it in production..
                                .then((result)=>{console.log(result.rowCount, (element[2].length) ); return 0})),
                                    Promise.resolve(null)
                                                )     
                    }
        })
    .then((result)=>
        {
            console.log(result)
            if (result instanceof Error) 
                {
                console.log('Company photo not inserted Error: ', result);
                return 'Company photo not inserted Error: ';
                }
            else{
                console.log('All Company data has been inserted', result);
                return 'All Company data has been inserted : ';
                }
        })
    .catch(function (error) { console.log('Error in adding Company record : ', error) 

        if (error.code === '23505'){return ' اسم الشركه مسجل اعد كتابة اسم الشريكه ';}
    })
    
 }// End of insertRec function

}; // End of class


  

 


 // module.exports = conntoPgDB ; 

// ========================== End of class defination =======================

/* Hossam




 // function insertRec (con) 
function insertRec (con, values,company,note) 
      {  

      /*
          // Insert one row in table
          var sql = "INSERT INTO employees (id, name, age, city) VALUES ('1', 'Ajeet Kumar', '27', 'Allahabad')";  
                  con.query(sql, 
                              function (err, result) {  
                                          if (err) throw err;  
                                          console.log("1 record inserted");  
                                                      }
                          );  

      */

/* Hossam
  // Insert more than one row in table
      var id;
      var sql = "INSERT INTO photo (photoName, photoFile) VALUES ?"; 
      var sql2 = "INSERT INTO company (photoId, companyName, notes) VALUES ?";  
     /* var values = [ 
                      ['2', 'Bharat Kumar', '25', 'Mumbai'], 
                      ['3', 'John Cena', '35', 'Las Vegas'],
                      ['4', 'Ryan Cook', '15', 'CA']
                  ]; 
     */
/*
            return  con.query(sql, [values], function (err, result) 
                      {  
                          if (err) 
                              {console.log('Photo not inserted : ', err);}
                          else {
                              console.log("Number of records inserted : " + result.affectedRows
                                  + "\n insert Id : " + result.insertId
                              ); 
                              }
                              
                              var value = [[result.insertId, company,note]]
                              con.query(sql2, [value], function (err, result) 
                              {  
                                  if (err) 
                                      {console.log('Hossam is insert Erro : ', err);}
                                  else {
                                      console.log("Number of records inserted : " + result.affectedRows
                                          + "\n insert Id : " + result.insertId
                                      ); 
                                      }
                                      return result.insertId
                              })
  
                      }
                  );
                  

                

                     
      }// End of insertRec function


function selectRec(con)
      {
          
          var sql = "SELECT * FROM employees";  
  return  new Promise((resolve, reject) => {                
          con.query(sql, function (err, result,fields) {
              // error will be an Error if one occurred during the query
              // results will contain the results of the query
              // fields will contain information about the returned results fields (if any)
             
              if (err) 
                  {console.log('This is select Erro : ', err);}
                  else { 
                  try{
                  // console.log("Number of fields Selected: " , result);
                  console.log("Number of records Selected: " , result.length);
                  console.log("This is the first record of the selected rows : " , result[0]);
                  console.log("This the value of the name fiels in first record data : " , result[0].name); 
                  resolve(result);
                      
                      }
                  catch(errTC){console.log(' This is a Non SQL Error From Select statemant ',errTC)}                          
                      }
            })    
      })
  
  }

//  function updateRec(con, fieldName, oldValue, newValue)
function updateRec(con)
  {
//      var sql = `UPDATE employees SET ${fieldName} = ${newValue} WHERE ${fieldName} = ${oldValue}` 
  var sql = "UPDATE employees SET city = 'Delhi' WHERE city = 'Mumbai'"; 
  return  new Promise((resolve, reject) => {   
          con.query(sql, function (err, result) 
          {  
              if (err) 
                      {console.log('This is update Erro : ' + err);}
                  else {
                          console.log("Record(s) updated : " + result.affectedRows );  
                      }
  
              resolve(result)
      }
  );  
  
  })
  
  }
  
  function deleteRec(con)
  {
//      var sql = `UPDATE employees SET ${fieldName} = ${newValue} WHERE ${fieldName} = ${oldValue}` 
  var sql = "DELETE FROM employees WHERE city = 'Delhi'"; 
  return  new Promise((resolve, reject) => {   
          con.query(sql, function (err, result) 
          {  
              if (err) 
                      {console.log('This is a Delete Erro : ' + err);}
                  else {
                          console.log("Record(s) Deleted : " + result.affectedRows );  
                      }
  
              resolve(result)
      }
  );  
  
  })
  
  }    

  function  closeconn()
  {
      conn.end( (err) =>  { if(err){console.log('Error For Closs'+ (err))} 
                              else console.log('Connection closed!...')} );
  }

/*      module.exports = {
              
    //      createconn:createconn,
          conntodb:conntodb,
          createdb:createdb,
          createtable:createtable,
          insertRec:insertRec,
          selectRec:selectRec,
          updateRec:updateRec,
          deleteRec:deleteRec,
          closeconn:closeconn,
          setConn:setConn,
          setConnDB:setConnDB,
          getConn:getConn


       }

*/








