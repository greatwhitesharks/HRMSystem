
const db = require('../../../db');
const RoleService= require('../../../services/roleAndPermission.service');
const Repository= require('../../../db/common/baseRepository');

/**
 *
 */
class DepartmentController {
  /** 
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
  static async create(req, res, next) {
    const service = new RoleService(db);
    await service.create(
        req.body.roleName,
    );
    req.flash('success', 'Role Created Successfully!');
    res.redirect('/roles/add');
    // return res.json({status: 'success'});
  }

  /**
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
  static async delete(req, res, next) {
    const service = new RoleService(db);
    await service.delete(req.roleName);
    req.flash('success', 'Role Deleted Successfully!');
    res.redirect('/roles/');
    //return res.json({status: 'success'});
  }


  static async addUser(req, res){
    const repo = new Repository(db, 'employee_account_has_role');
    await repo.create({
      employee_record_id: req.body.user,
      role: req.param.role
    });

    req.flash('success', 'User Added Successfully!');
    res.redirect('/roles/'+req.params.role);
  }
  static async deleteUser(req, res){
    const repo = new Repository(db, 'employee_account_has_role');
    await repo.delete({
      employee_record_id: req.body.user,
      role: req.params.role
    });
    req.flash('success', 'User Removed Successfully!');
    res.redirect('/roles/'+req.params.role);
  }

  static async addPermission(req, res){
    const repo = new Repository(db, 'role_has_permission');
    const {entity, action, group} = req.body.permission.split('_');
    await repo.create({
      entity,
      action,
      group,
      role: req.param.role
    });

    req.flash('success', 'Permission Added Successfully!');
    res.redirect('/roles/'+req.params.role);
  }
  static async deletePermission(req, res){
    const repo = new Repository(db, 'role_has_permission');
    const {entity, action, group} = req.body.permission.split('_');
    await repo.delete({
      entity,
      action,
      group,
      role: req.param.role
    });

    req.flash('success', 'Permission Removed Successfully!');
    res.redirect('/roles/'+req.params.role);
  }

  static async addJobTitle(req, res){
    const repo = new Repository(db, 'job_title_has_role');
    await repo.create({
      job_title: req.body.jobTitle,
      role: req.param.role,
    });

    req.flash('success', 'Job Title Added Successfully!');
    res.redirect('/roles/'+req.params.role);
  }
  static async deleteJobTitle(req, res){
    const repo = new Repository(db, 'job_title_has_role');
    await repo.create({
      job_title: req.body.jobTitle,
      role: req.param.role,
    });

    req.flash('success', 'Job Title Removed Successfully!');
    res.redirect('/roles/'+req.params.role);
  }
}


module.exports = DepartmentController;
