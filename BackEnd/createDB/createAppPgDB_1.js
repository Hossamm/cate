
 
/* 
 // import {setConn} from './conntosql.js'

 const conntosql = require('./conntosql.js');

 const postgresDBConn = new conntosql();
 postgresDBConn.conntodb();
*/


const DB = require('./pgDBCreationClass_1.js');

const DBcreation = new DB()

const TablesCreation = new DB('hossam');

// الحمد لله 
async function setupAppDB() {

 await DBcreation.conntodb();
 await DBcreation.createdb('hossam');
 await DBcreation.closeconn();
 await TablesCreation.conntodb();
 await TablesCreation.createtable();
 await TablesCreation.closeconn()

}

setupAppDB()

// الحمد لله  
