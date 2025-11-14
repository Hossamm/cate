const { Client } = require('pg');
const fs = require('fs');

module.exports = class conntosql {
    constructor(dbName) {
        this.conn = new Client({
                       user: 'postgres',
                    // user: 'catedb_user',
                       password: 'postgres',
                    //   password: '14aJZnqCZrSaC5NxUuBVuT9TG9FiKNdW',
                      host: 'localhost',   
                     //  host: 'dpg-cu80sjd2ng1s73cv0eug-a',
                       port: '5432',
                    // database: 'catedb',
                       database: dbName,
               });
           
           }
  
   async conntodb () // connect to DB function
    { 
    
  return await this.conn.connect()
        .then(() => { 
            console.log('Connected to PostgreSQL database');
        })
        .catch((err) => {
            console.error('Error connecting to PostgreSQL database', err); 
        })
                   
    }


 async createdb(dbName)
{

   // Create DB using .query Promise (async/await) function 
  return await this.conn
      .query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${dbName}'`) 
      .then((result) => 
            {
                if (result.rowCount === 0) {
                    console.log(`${dbName} database not found, creating it.`);
                return  this.conn.query(`CREATE DATABASE ${dbName};`)
                    .then((result)=>
                        {
                        if (result){
                        console.log(`Database ${dbName} has been created`);
                    
                                  }

                        })
                    .catch((err) => {
                        console.error(`Error in creating ${dbName} database : `, err);
                
                    })
                    
                } else {
                    console.error(`The ${dbName} database already  exists.`);
                }
        
            }
           ) 
           
        .catch((err) => {
            console.error('Error in connecting to PostgreSQL database', err);
        })
    

}


async createtable () 
{
    // Create DB tables using sql script file call dbTables.sql  

    const TableQuery = fs.readFileSync('./BackEnd/createDB/dbTables.sql', 'utf-8');
    return await this.conn.query(TableQuery)
            .then(() => 
                {
                    console.error('The DataBase Tables have been created : '); 
            
                }
               ) 
            .catch((err) => 
                {
                    if (err.code === '42P07')
                    {console.error('The table already exists')}
                    else{
                        
                    console.error('Error in creating DataBase Tables : ', err);
                        }
                //    this.closeconn();
                });
    
}

async  closeconn()
{

     return await this.conn
                .end()
                .then(() => {
                    console.log('Connection to PostgreSQL closed');
                })
                .catch((err) => {
                    console.error('Error closing connection', err);
                });


}

  }; 

// module.exports = conntosql ;  
