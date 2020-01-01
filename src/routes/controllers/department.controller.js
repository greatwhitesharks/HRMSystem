
const db = require('../../db');
const DepartmentService = require('../../services/department.service');
/**
 *
 */
class DepartmentController {
  /** */
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
  static async create(req, res, next) {
    service = new DepartmentService(db);
    await service.create(
        req.body.name,
        req.body.branchId,
        req.body.budget,
    );
    req.flash('success', 'Department Created Successfully!');
    res.redirect('/department/add');
    // return res.json({status: 'success'});
  }

  /**
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
  static async delete(req, res, next) {
    service = new DepartmentController(db);
    await service.delete(req.departmentId);
    req.flash('success', 'Department Deleted Successfully!');
    res.redirect('/department/');
    //return res.json({status: 'success'});
  }
}


module.exports = DepartmentController;
