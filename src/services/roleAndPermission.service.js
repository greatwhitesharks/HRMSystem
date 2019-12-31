const roleRepository =require('../repositories/role.repository');
const permissionRepository =require('../repositories/permission.repository');
const permission = require('../models/permission.model');
const role=require('../models/role.model');
class RoleAndPermissionService {
    /**
     *
     * @param {*} db
     */
    constructor(db) {
      this.db = db;
    }
    async createRole(role,permission){
        //TODO implement.

    }
    async getPermissions(){
        const roleRepo=new permissionRepository(this.db);
        return await roleRepo.getPermissions();
    }
    
    
}
module.exports=RoleAndPermissionService;   