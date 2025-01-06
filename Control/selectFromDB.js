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
 
async selectOneColWhere(cloNmae,tableName,whereClo,whereValue) {
  await workWithPgDB.conntodb();
  console.log("================Uncorrect path ================" + Object.keys(whereValue).length)
var objectLength = Object.keys(whereValue).length
this.selectedImages = [];
  if (objectLength > 1)
  {  
    for( var i =0; i < Object.keys(whereValue).length;i++)
      {
        this.selectedImages[i] = await workWithPgDB.getColFromTableWhere(cloNmae,tableName,whereClo,whereValue[i]); 
        // console.log(selectedImages[i]) 
      }
  return this.selectedImages;
  }
    else 
    {
      console.log("================Uncorrect path 2 ================")
      this.selectedImages[0] = await workWithPgDB.getColFromTableWhere(cloNmae,tableName,whereClo,whereValue[0]);
      return this.selectedImages;
    }
  
}
// الحمد لله  

async selectOneColFromJoinTables(friColName,secColName,friTableName,secTableName,
                                    friWhereClo,secWhereClo,friWhereValue) {
    await workWithPgDB.conntodb();
  
   return await workWithPgDB.getColFromJoinTables(friColName,secColName,friTableName,secTableName,
                          friWhereClo,secWhereClo,friWhereValue)

  }
//==================================================
} // Class End



