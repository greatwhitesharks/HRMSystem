const roleRepository =require('../repositories/role.repository');
const permissionRepository =require('../repositories/permission.repository');
const BaseRepository = require('../db/common/baseRepository');
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
      await roleRepo.delete({role});

      await (new BaseRepository(db, 'employee_record_has_role')).delete({role});
      await (new BaseRepository(db, 'job_title_has_role')).delete({role});
    }

    async getUsersInRole(role){
      return (await (this.db.execute(`SELECT er.*, b.name as branch, d.name as department from employee_record er JOIN employee_account_has_role erhr on er.id = erhr.employee_record_id join department d on er.department_id = d.id join branch b on d.branch_id = b.id  where role = ?`, [role])))[0];
    }

    async getPermissionsInRole(role){
      return (await (new BaseRepository(this.db, 'role_has_permission')).find({role}));
    }

    async getJobsInRole(role){
      return (await (new BaseRepository(this.db, 'job_title_has_role')).find({role}));
    }
}
module.exports=RoleAndPermissionService;   