
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
    await service.createRole(
        req.body.roleName,
    );
    req.flash('success', 'Role Created Successfully!');
    res.redirect('/roles/add');
    // // return res.json({status: 'success'});
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
    await repo.save({
      employee_record_id: req.body.user,
      role: req.params.role
    });

    req.flash('success', 'User Added Successfully!');
    res.redirect('/roles/'+req.params.role);
  }
  static async deleteUser(req, res){
    const repo = new Repository(db, 'employee_account_has_role');
    await repo.delete({
      employee_record_id: req.params.user,
      role: req.params.role
    });
    req.flash('success', 'User Removed Successfully!');
    res.redirect('/roles/'+req.params.role);
  }

  static async addPermission(req, res){
    const repo = new Repository(db, 'role_has_permission');
    const arr =req.body.permission.split('_');
    const entity = arr[1];
    const action = arr[0];
    const group = arr[2];
    console.log(req.body.permission.split('_'),entity,action,group);
    await repo.save({
      entity,
      action,
      // group,
      role: req.params.role
    });

    req.flash('success', 'Permission Added Successfully!');
    res.redirect('/roles/'+req.params.role);
  }
  static async deletePermission(req, res){
    const repo = new Repository(db, 'role_has_permission');
   const entity = req.params.entity;
   const action = req.params.action;
   const group = req.params.group;
    await repo.delete({
      entity,
      action,
      'group':group,
      role: req.params.role
    });

    req.flash('success', 'Permission Removed Successfully!');
    res.redirect('/roles/'+req.params.role);
  }

  static async addJobTitle(req, res){
    const repo = new Repository(db, 'job_title_has_role');
    console.log({
      job_title: req.body.jobTitle,
      role: req.params.role,
    })
    await repo.save({
      job_title: req.body.jobTitle,
      role: req.params.role,
    });

    req.flash('success', 'Job Title Added Successfully!');
    res.redirect('/roles/'+req.params.role);
  }
  static async deleteJobTitle(req, res){
    const repo = new Repository(db, 'job_title_has_role');
    await repo.delete({
      job_title: req.params.job,
      role: req.params.role,
    });

    req.flash('success', 'Job Title Removed Successfully!');
    res.redirect('/roles/'+req.params.role);
  }
}


module.exports = DepartmentController;
