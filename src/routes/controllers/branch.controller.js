
const db = require('../../db');
const BranchService = require('../../services/branch.service');
/**
 *
 */
class BranchController {
  /**
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
  static async create(req, res, next) {
    service = new BranchService(db);
    await service.create(
        req.body.name,
        req.body.line1,
        req.body.line2,
        req.body.city,
        req.body.region,
        req.body.country,
        req.body.currency,
    );
    req.flash('success', 'Branch Created Successfully!');
    res.redirect('/branch/add');
    // return res.json({status: 'success'});
  }

  /**
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
  static async delete(req, res, next) {
    service = new BranchController(db);
    await service.delete(req.branchId);
    req.flash('success', 'Branch Removed Successfully!');
    res.redirect('/branch/add');
    // return res.json({status: 'success'});
  }
}


module.exports = BranchController;
