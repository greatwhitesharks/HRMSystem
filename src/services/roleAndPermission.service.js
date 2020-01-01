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
     async createRole(role){
        //TODO implement.
        const roleRepo=new roleRepository(this.db);
        roleRepo.create({
          role
        })
    }
     async getPermissions(){
        const permissionRepo=new permissionRepository(this.db);
        return await permissionRepo.getPermissions();
    }
     async getPermissionsForSuperviser(role){
        const roleRepo=new roleRepository(this.db);
        return await roleRepo.getPermissionsForRole(role);
    }
  
     async getRoles(){
      const roleRepo=new roleRepository(this.db);
      roleRepo.table="role";
        return (await roleRepo.getAll()).map(x=>x.role);
    }

    async deleteRole(role){
      const roleRepo=new roleRepository(this.db);
      roleRepo.table="role";
        return (await roleRepo.delete({role}));
    }
}
module.exports=RoleAndPermissionService;   