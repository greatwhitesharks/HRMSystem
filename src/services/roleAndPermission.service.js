const roleRepository =require('../repositories/role.repository');
const permissionRepository =require('../repositories/permission.repository');
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