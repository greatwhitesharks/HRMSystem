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
  async assignRole(id,role){
    const sql="INSERT INTO `employee_account_has_role`(`employee_record_id`, `role`) VALUES (?,?)";
    await this.db.execute(sql,[id,role]);
  }
  async deleteAssignedRole(id,role){
    const sql="DELETE FROM `employee_account_has_role` WHERE employee_record_id=? and role=?";
    await this.db.execute(sql,[id,role]);
  }
  async getRoles(){
    const sql="";
    return await this.db.execute(sql); 
  }
}

module.exports = RoleRepository;