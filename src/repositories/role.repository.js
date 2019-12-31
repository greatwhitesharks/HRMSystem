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
  async createPermission(object) {
    return await this.db.execute(`insert into ${this.table}(role,entity,action,group)values(?,?,?,?)`,
      [object.role,
      object.entity,
      object.action,
      object.group]).then((result,err) => {
        if(err){
          console.log("error");
        }
        
      });
  }

  async createRole(object){
    var permissions=object.getPermissions();
    Object.keys(permissions).forEach(async (key)=> {
      await this.createPemission(permissions[key]);
}); 
  }
}

module.exports = RoleRepository;