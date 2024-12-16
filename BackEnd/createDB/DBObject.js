
 const DB = require('./DBClass.js');


 const DBcreation = new DB()

 const TablesCreation = new DB('catedb');

// الحمد لله 
async function setupAppDB() {

 await DBcreation.conntodb();
 await DBcreation.createdb('catedb');
 await DBcreation.closeconn();
 await TablesCreation.conntodb();
 await TablesCreation.createtable();
 await TablesCreation.closeconn()

}
module.exports = { setupAppDB }
//setupAppDB()

// الحمد لله  
