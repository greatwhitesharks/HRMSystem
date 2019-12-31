const BaseRepository = require('../db/common/baseRepository');
class PermissionRepository extends BaseRepository {
    /**
     *
     * @param {*} db
     */
    constructor(db) {
      super(db, 'permission');
  
    }
    async getPermissions(){
        return await this.db.execute(`select * from ${this.table} `).then(async (result)=>{
          var entities=[];
          Object.keys(result[0]).forEach(async (key)=> {
          var entity={};
          entity["event"]=result[0][key].entity;
          entity["action"]=result[0][key].action;
          entity["group"]=result[0][key].group;
          entities.push(entity);  
          });
          return entities;
        });
    }
   
}
module.exports=PermissionRepository;