const BaseRepository = require('../db/common/baseRepository');


/**
 * roleAndPermission Repository
 */
class RoleRepository extends BaseRepository {
  /**
   *
   * @param {*} db
   */
  constructor(db) {
    super(db, 'role_has_permission');

  }
  async createRole(object){
     
  }
  async getPermissionsForSuperviser(id){
    return await this.db.execute(`select * from ${this.table} where id `).then(async (result)=>{
      var entities=[];
      Object.keys(result[0]).forEach(async (key)=> {
      var entity={};
      entity["entity"]=result[0][key].entity;
      entity["action"]=result[0][key].action;
      entity["group"]=result[0][key].group;
      entities.push(entity);  
      });
      return entities;
    });
  }
}

module.exports = RoleRepository;