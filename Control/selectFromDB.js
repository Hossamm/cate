const conntoPgDB = require('../BackEnd/DBManipulation/conntoPgDB.js');

// ========================================
module.exports = class updateForm {

    constructor() { 
        this.workWithPgDB = new conntoPgDB();
           } 
        
// الحمد لله 
async selectOneCol(cloNmae,tableName) {
  await workWithPgDB.conntodb();
  return  await workWithPgDB.getColFromTable(cloNmae,tableName)
}
// الحمد لله  

//==========================================
}

