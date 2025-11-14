const { Client } = require('pg');

module.exports = class conntoPgDB {
    constructor(dbName) {
        this.conn = new Client({
                     user: 'postgres',
                    // user: 'catedb_user',
                     password: 'postgres',
                  //   password: '14aJZnqCZrSaC5NxUuBVuT9TG9FiKNdW',
                     host: 'localhost',   
                  //   host: 'dpg-cu80sjd2ng1s73cv0eug-a',
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
            console.error('Error connecting to nodedb DB : \n', err); 
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
                    console.error('Error closing nodedb DB connection : \n', err);
                });


}

 // function insertRec
 async insertRec(companyValues, photoValues) 
 {  
// Insert more than one row in table   
  var companysql = 'INSERT INTO company(com_name, com_type, com_purpose, com_address, com_capital, notes) VALUES ($1, $2, $3, $4, $5, $6)'
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
                return 'تم تسجيل بيانات الشريكه بنجاح .....';
                }
        })
    .catch(function (error) { console.log('Error in adding Company record : ', error) 

        if (error.code === '23505'){return ' اسم الشركه مسجل اعد كتابة اسم الشريكه ';}
    })
    
 }// End of insertRec function

 /*
 async insertRec(companyValues, photoValues) 
 {  
// Insert more than one row in table   
  var companysql = 'INSERT INTO company(com_name, com_type, com_purpose, com_address, notes) VALUES ($1, $2, $3, $4, $5)'
  var photosql = 'INSERT INTO images (company_id, image, name) VALUES ($1, $2, $3)';
 */

 async insertRecInForeignTable(companyValues, photoValues) 
  {
    console.log(companyValues)
    var photosql = 'INSERT INTO images (company_id, image, name) VALUES ($1, $2, $3) RETURNING *';

    return this.conn.query(`select id from company where com_name = '${companyValues[0]}'`)
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
                            var imageRecData = [];
                          return photoValues.reduce(
                            (p, element,index) => 
                                p.then(() => this.conn.query(photosql,element)
                                    // delete the next line only with keeping the , when you use it in production..
                                    .then((result)=>{
                                      
                                    //console.log('This the insert result' + result)


                                        imageRecData[index] = result.rows[0]; 
                                       // imageRecData.splice(-1)
                                        return imageRecData;
                                    
                                                    }
                                            )), Promise.resolve(null)
                                                    )     
                        }
            })
        .then((result)=>
            {
            
                if (result instanceof Error) 
                    {
                    console.log('Company photo not inserted Error: ', result);
                    return 'Company photo not inserted Error: ';
                    }
                else{
                  //  console.log('All Company data has been inserted', result);
                    return result;
                    }
            })
             .catch((err) => {

                console.log('\n This is an Error Messag from insertRecInForeignTable function in connectPgDB Class \n',err);

                if (err.code == 23505) 
                    {return 'duplicate key value violates unique constraint - images_company_id_name_key';}
              });
  } // End insertRecInForeignTable

// function insertUpdatsRec(updatedfields)
//async insertRec(companyValues, photoValues) 
async insertUpdatsRec(updatedfields)
{    // company_name,user_name,date,field_name,new_value,old_value
    
 var companysql = 'INSERT INTO com_updates(company_name,user_name,date,field_name,new_value,old_value) VALUES ($1, $2, $3, $4, $5, $6)'
 
// Insert 
return await this.conn.query(companysql,updatedfields)
   .then((result)=>
       {
           
           if (result instanceof Error) 
               {
               console.log('Company photo not inserted Error: ', result);
               return 'Company photo not inserted Error: ';
               }
           else{
               console.log('All Company data has been inserted', result);
               return 'تم تسجيل بيانات الشريكه بنجاح .....';
               }
       })
   .catch(function (error) { console.log('Error in adding Company record : ', error) 

   })
   
}// End of insertUpdatsRec(updatedfields) function

async getComUpdatesData() 
    {  
    // Insert new Company recors in Company Table 
      
        return await this.conn.query(`select id, company_name, user_name, date, field_name, new_value, old_value from com_updates`)
        .then((result) =>
            {
                    if (result instanceof Error) 
                        {
                            console.log('Company updates data not Selected Error: ', result);
                            return ('Company updates data not Selected Error: ' + result);
                        }
                    else{ 
                        return result;
                        }
                    })
                    .catch((err) => {
    
                        console.log('\n This is an Error Messag /getComUpdatesData of connectPgDB Class \n',err);
                        // return '\n This is an Error Messag /getComUpdatesData of connectPgDB Class \n'+ err;
                      })
    }


    async getUserName(id) 
    {  

        return await this.conn.query(`select user_name from users where id = ${id}`)
        .then((result) =>
            {
                    if (result instanceof Error) 
                        {
                            console.log('select user Error: ', result);
                            return ('select user Error: ' + result);
                        }
                    else{ 
                        
                        return result.rows[0].user_name;
                        }
                    })
                    .catch((err) => {
    
                        console.log('\n This is an Error Messag from /getUserName() of connectPgDB Class \n',err);
                        // return '\n This is an Error Messag /getComUpdatesData of connectPgDB Class \n'+ err;
                      })
    }




// Function Get/Select All Company Data ... 
async getComData(comName) 
{  
 var ComFields = [];
 var ComFiles = [];
 var ComAllData = [];
// Insert new Company recors in Company Table 

    return await this.conn.query(`select * from company where com_name = '${comName}'`)
   .then((result) =>
       {   
          // console.log(`Selected row from Company table where Company name is ${comName} : `, result.rowCount)

               if (result instanceof Error) 
                   {console.log('Company data not Selected Error: ', result);}
               else{          
                       // Select files from images table result.rows.values
                       ComFields = result.rows;
                    //   console.log(result)
                     return this.conn.query(`select encode(image, 'base64'), name from images where company_id = '${result.rows[0].id}'`)
                                           //select encode(image, 'base64'), name from images where company_id
                               // delete the next line only with keeping the , when you use it in production..
                               .then((result)=>
                                {
                                    if (result instanceof Error) 
                                        {console.log('Company data not Selected Error: ', result);}
                                    else{
                                       // console.log("Number of files is : " + result.rowCount);
                                         ComFiles = result.rows;
                                        // console.log(result.rows[0].encode)
                                        // console.log(result.rows[0])
                                         ComAllData = [ComFields,ComFiles];
                                         
                                         return ComAllData;                                        
                                        }    
                                })                 
                                                    
       }
       
    })
   
   .catch(function (error) { console.log('\n This is an Error Messag /getComData of connectPgDB Class \n ', error) })


   
}// End of Get/Select All Company Data Function ...


async getColFromTable(cloNmae,tableName) 
{  
// Insert new Company recors in Company Table 

    return await this.conn.query(`select ${cloNmae} from ${tableName}`)
    .then((result) =>
        {   
           // console.log(`Selected row from Company table where Company name is ${comName} : `, result.rowCount)
 
                if (result instanceof Error) 
                    {
                        console.log('Company data not Selected Error: ', result);
                        return ('Company data not Selected Error: ' + result);
                    }
                else{ 
                    return result;
                    }
                })
                .catch((err) => {

                    console.log('\n This is an Error Messag /getColFromTable of connectPgDB Class \n',err);
                  })
}


//   return this.conn.query(`select encode(image, 'base64'), name from images where company_id = '${result.rows[0].id}'`

async getColFromTableWhere(cloNmae,tableName,whereClo,whereValue) 
{  
// Insert new Company recors in Company Table 
    var xxx =`select ${cloNmae} from ${tableName} where ${whereClo} = '${whereValue}'`;
    console.log(xxx)
    return await this.conn.query(`select ${cloNmae} from ${tableName} where ${whereClo} = '${whereValue}'`)
                    
    .then((result) =>
        {  
            
            console.log(`selected ${cloNmae} from ${tableName} table where ${whereClo} is ${whereValue} :` , result.rowCount);

                if (result instanceof Error) 
                    {
                        console.log('Images not Selected Error: ', result);
                        return ('Images not Selected Error: ' + result);
                    }
                else if(result.rowCount === 0)
                {
                    console.log('=============== No Record Selected ================')
                    return result;
                }
                else{ 

                    console.log('=========================Image name selected from conntoPgDB ==================')
                    return result;
                    }
                })
                .catch((err) => {

                    console.log('\n This is an Error Messag /getColFromTableWhere of connectPgDB Class \n',err);
                  });
}

async getColFromJoinTables(friColName,secColName,
                            friTableName,secTableName,
                            friWhereClo,secWhereClo,
                            friWhereValue) 
{ 

 return await this.getColFromTableWhere(friColName,friTableName,friWhereClo,friWhereValue)
 .then((result)=>{

    if (result instanceof Error) 
        {
            console.log('Error in Select Company Id : ' , result);
            return ('Company Id not Selected Error: ' + result);
        }
    else{ 
    
    
        return this.getColFromTableWhere(secColName,secTableName,secWhereClo,result.rows[0].id)
        .then((result)=>{

            if (result instanceof Error) 
                {
                    console.log('Error in Select image Name : ' , result);
                    return ('image Nam not Selected Error: ' + result);
                }
            else if (result.rowCount === 0)
                {
                    console.log('=============== No Record Selected ================')
                    return result;
                }
            else
            { 
                // console.log(result)
                return  result; 
                }
        })
        .catch((err) => {

            console.log('\n This is an Error Messag /getColFromTableWhere of connectPgDB Class \n',err);
          });
        
        }
 })
 .catch((err) => {

    console.log('\n This is an Error Messag /getColFromJoinTables of connectPgDB Clas \n',err);
  });
 
}

// function updateRec(tableName, columnAndValueString, whereClo, whereValue)
// columnAndValueString = `first_name = 'MS', last_name = 'Dhoni'`
// ${fieldName} = ${newValue}

async updateRec(tableName,columnAndValueString,whereClo,whereValue)
  {
    console.log(`UPDATE ${tableName} SET ${columnAndValueString} WHERE ${whereClo} = ${whereValue}`)
      var sql = `UPDATE ${tableName} SET ${columnAndValueString} WHERE ${whereClo} = ${whereValue}` 

 return await this.conn.query(sql)
                    
 .then((result) =>
     {   
        // console.log(`Selected row from Company table where Company name is ${comName} : `, result.rowCount)

             if (result instanceof Error) 
                 {
                     console.log('Error in Updating Table Record ', result);
                     return ('Error in Updating Table Records: ' + result);
                 }
             else{ 
                 return 'تم تعديل بيانات الشريكة بنجاح';
                 }
             })
             .catch((err) => {

                console.log('\n This is an Error Messag /updateRec of connectPgDB Clas \n',err);
                return 'البيانات لم تعدل';
              });
  }

  async deleteJoinRec(pKeyTableName,fKeyTableName,pKeyClo,fKeyClo,whereClo,whereValue)
  {
  
    console.log(`DELETE FROM ${fKeyTableName} WHERE ${fKeyClo} IN 
                                            (select ${pKeyClo} from ${pKeyTableName} where ${whereClo} = ${whereValue})`)
    console.log(`DELETE FROM ${pKeyTableName}  WHERE ${whereClo} = ${whereValue}`)

    var sqlFoeImg = `DELETE FROM ${fKeyTableName} WHERE ${fKeyClo} IN 
                                            (select ${pKeyClo} from ${pKeyTableName} where ${whereClo} = ${whereValue})`
    var sqlForCom = `DELETE FROM ${pKeyTableName}  WHERE ${whereClo} = ${whereValue}`
    
    return await this.conn.query(sqlFoeImg)
                    
    .then((result) =>
        {   
           // console.log(`Selected row from Company table where Company name is ${comName} : `, result.rowCount)
   
                if (result instanceof Error) 
                    {
                        console.log(' Error in Deleting Image Table Record ', result);
                        return ('Error in Deleting Image Table Record: ' + result);
                    }
                else{ 
                      return this.conn.query(sqlForCom)
                      .then(()=>
                            {
                                if (result instanceof Error) 
                                    {
                                        console.log(' Error in Deleting Company Table Record ', result);
                                        return ('Error in Deleting Company Table Record: ' + result);
                                    }
                                else{
                                        return (' تم الغاء بيانات الشريكة بنجاح ....')
                                    }
                            })
                    }
                })
                .catch((err) => {
   
                   console.log('\n This is an Error Messag /updateRec of connectPgDB Clas \n',err);
                 });


}

async selectJoinTablesRecWithAndOr(selectColName, pKeyTableName, fKeyTableName, pKeyClo, fKeyClo, 
                            friWhereClo, friWhereValue, secWhereClo, secWhereValue)
{

  /*  select image FROM images 
    WHERE (company_id IN (select id from company where com_name = 'حاتم') and name = 'Khebrat.jpg')

    (pKeyTableName, fKeyTableName, pKeyClo, fKeyClo, 
        friWhereClo, friWhereValue, secWhereClo, secWhereValue)*/
    
  console.log(`SELECT ${selectColName} FROM ${fKeyTableName} WHERE (
                            ${fKeyClo} IN (select ${pKeyClo} from ${pKeyTableName} where ${friWhereClo} = ${friWhereValue})
                            AND ${secWhereClo} = ${secWhereValue} )`)

  var sql= `SELECT encode(image, 'base64') FROM ${fKeyTableName} 
                        WHERE (
                                ${fKeyClo} IN 
                                (select ${pKeyClo} from ${pKeyTableName} where ${friWhereClo} = '${friWhereValue}')
                                           AND ${secWhereClo} = '${secWhereValue}' )`
  
  return await this.conn.query(sql)               
  .then((result) =>
      {   
          console.log(`Selected row from Company table where Company name is ${friWhereValue} : `, result.rowCount)
 
              if (result.rowCount===0) 
                  {
                      console.log('Error in Selected image From Images Table ', result);
                      return ('المستند غير موجود');
                  }
              else{ 
                    return result;
                  }
              })
              .catch((err) => {
 
                 console.log('\n This is an Error Messag selectJoinTablesRecWithAndOr of connectPgDB Clas \n',err);
               });


}

    async deleteJoinTablesRecWithAndOr(deleteColName, pKeyTableName, fKeyTableName, pKeyClo, fKeyClo, 
        friWhereClo, friWhereValue, secWhereClo, secWhereValue)
    {

        /*  select image FROM images 
        WHERE (company_id IN (select id from company where com_name = 'حاتم') and name = 'Khebrat.jpg')

        (pKeyTableName, fKeyTableName, pKeyClo, fKeyClo, 
        friWhereClo, friWhereValue, secWhereClo, secWhereValue)*/

        console.log(`DELETE FROM ${fKeyTableName} WHERE (
            ${fKeyClo} IN (select ${pKeyClo} from ${pKeyTableName} where ${friWhereClo} = ${friWhereValue})
            AND ${secWhereClo} = ${secWhereValue} )`)

        var sql= `DELETE FROM ${fKeyTableName} 
        WHERE (
                ${fKeyClo} IN 
                (select ${pKeyClo} from ${pKeyTableName} where ${friWhereClo} = '${friWhereValue}')
                        AND ${secWhereClo} = '${secWhereValue}' )`

        return await this.conn.query(sql)               
        .then((result) =>
        {   

        if (result.rowCount === 0) 
        {
        console.log(' Error in Deleting Image Table Record ', result);
        return ('لم يتم الغاء المستند');
        }
        else{ 
        console.log('================== This is Delete Result Record ========================\n' , result)
        return "تم الغاء المستند";
        }
        })
        .catch((err) => {

        console.log('\n This is an Error Messag /updateRec of connectPgDB Clas \n',err);
        });


    }




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








