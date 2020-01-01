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
        const permissionRepo=new permissionRepository(this.db);
        return await permissionRepo.getPermissions();
    }
    async getPermissionsForSuperviser(role){
        const roleRepo=new roleRepository(this.db);
        return await roleRepo.getPermissionsForRole(role);
    }
    
}
module.exports=RoleAndPermissionService;   