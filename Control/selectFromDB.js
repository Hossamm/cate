const conntoPgDB = require('../BackEnd/DBManipulation/conntoPgDB.js');

//===========================================



    

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
         await workWithPgDB.getColFromTableWhere(cloNmae,tableName,whereClo,whereValue[i])
        .then((selectedImages)=>{
          this.selectedImages[i] = selectedImages;
          if( i === (Object.keys(whereValue).length -1 ) )
                {  
                // console.log('This is a selected files :' + this.selectedImages)
                     return this.selectedImages;
                }
        })
          
      }
      console.log('This is a selected files :' + this.selectedImages)
  return this.selectedImages;
  }
    else 
    {
      console.log("================Uncorrect path 2 ================")
     return await workWithPgDB.getColFromTableWhere(cloNmae,tableName,whereClo,whereValue[0])
      .then((selectedImages)=>{
        this.selectedImages[0] = selectedImages;
       // console.log('This is a selected file : ' , this.selectedImages[0].rows[0])
        return this.selectedImages;
      })
       
      
    }
  
}
// الحمد لله  

async selectOneColFromJoinTables(friColName,secColName,friTableName,secTableName,
                                    friWhereClo,secWhereClo,friWhereValue) {
    await workWithPgDB.conntodb();
  
   return await workWithPgDB.getColFromJoinTables(friColName,secColName,friTableName,secTableName,
                          friWhereClo,secWhereClo,friWhereValue)

  }

  // الحمد لله  
 
                       
async updateTableRec(tableName,columnAndValueString,whereClo,whereValue) 
{
  await workWithPgDB.conntodb();

  return await workWithPgDB.updateRec(tableName,columnAndValueString,whereClo,whereValue)
}
//==================================================


async deleteJoinTablesRec(pKeyTableName,fKeyTableName,pKeyClo,fKeyClo,whereClo,whereValue)
{
  await workWithPgDB.conntodb();
  return await workWithPgDB.deleteJoinRec(pKeyTableName,fKeyTableName,pKeyClo,fKeyClo,whereClo,whereValue)
}

async selectJoinTablesRecWithAndOr(selectColName,pKeyTableName, fKeyTableName, pKeyClo, fKeyClo, 
                                    friWhereClo, friWhereValue, secWhereClo, secWhereValue)
{
  await workWithPgDB.conntodb();
var objectLength = Object.keys(secWhereValue).length
this.selectedImages = [];
  if (objectLength > 1)
  {  
    console.log("================Uncorrect path 1 ================" + Object.keys(secWhereValue).length)
    for( var i =0; i < Object.keys(secWhereValue).length;i++)
      {
        await workWithPgDB.selectJoinTablesRecWithAndOr(selectColName. pKeyTableName, fKeyTableName, pKeyClo, fKeyClo, 
                                            friWhereClo, friWhereValue, secWhereClo, secWhereValue[i])
        .then((selectedImages)=>{
          this.selectedImages[i] = selectedImages;
        })
          
      }
      //console.log('This is a selected files :' + this.selectedImages)
      return this.selectedImages;
  }
    else 
    {
      console.log("================Uncorrect path 2 ================")
     return await workWithPgDB.selectJoinTablesRecWithAndOr(selectColName, pKeyTableName, fKeyTableName, pKeyClo, fKeyClo, 
                                                      friWhereClo, friWhereValue, secWhereClo, secWhereValue)
      .then((selectedImages)=>{
        if (selectedImages === 'المستند غير موجود')
        {return selectedImages};
        this.selectedImages[0] = selectedImages;
       // console.log('This is a selected file : ' , this.selectedImages[0].rows[0])
        return this.selectedImages;
      })
       
      
    }
  
}
// الحمد لله 

async deleteJoinTablesRecWithAndOr(deleteColName,pKeyTableName, fKeyTableName, pKeyClo, fKeyClo, 
  friWhereClo, friWhereValue, secWhereClo, secWhereValue)
{
await workWithPgDB.conntodb();
var objectLength = Object.keys(secWhereValue).length
this.selectedImages = [];
if (objectLength > 1)
{  
console.log("================Uncorrect path 1 ================" + Object.keys(secWhereValue).length)
for( var i =0; i < Object.keys(secWhereValue).length;i++)
{
await workWithPgDB.deleteJoinTablesRecWithAndOr(deleteColName, pKeyTableName, fKeyTableName, pKeyClo, fKeyClo, 
          friWhereClo, friWhereValue, secWhereClo, secWhereValue[i])
.then((selectedImages)=>{
this.selectedImages[i] = selectedImages;
})

}
//console.log('This is a selected files :' + this.selectedImages)
return this.selectedImages;
}
else 
{
console.log("================Uncorrect path 2 ================")
return await workWithPgDB.deleteJoinTablesRecWithAndOr(deleteColName, pKeyTableName, fKeyTableName, pKeyClo, fKeyClo, 
                    friWhereClo, friWhereValue, secWhereClo, secWhereValue)
.then((selectedImages)=>{
this.selectedImages[0] = selectedImages;
// console.log('This is a selected file : ' , this.selectedImages[0].rows[0])
return this.selectedImages;
})


}

}

//     insertRecInForeignTable(dbQueryVariabls[0], dbQueryVariabls[1], dbQueryVariabls[2], dbQueryVariabls[3], photoValues)// Array of Image file and its file name
async  insertImages(comName, photoValues) {

  await workWithPgDB.conntodb();

           var imagesData = []
   
            await workWithPgDB.insertRecInForeignTable(comName, photoValues)
                        .then((insertImagesResult)=>
                              { 
                                
                                if( insertImagesResult == 'duplicate key value violates unique constraint - images_company_id_name_key')
                                   { imagesData = insertImagesResult; return }
                                
                                for(var i = 0; i <photoValues.length;i++)
                                  {
                          imagesData[i] = { encode:Buffer.from(insertImagesResult[i].image).toString('base64'), 
                                              name:insertImagesResult[i].name};
                                  }
                                })
                  
            return imagesData;
}


} // Class End



