const EmployeeAccountService =
  require('../../services/employeeAccount.service');
   
const db = require('../../db');
const bcrypt = require('bcrypt');

/**
 *
 */
class AccountController {
  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static create(req, res) {
    const {
      id,
      email,
      password,
    } = req.body;

    const accountService = new EmployeeAccountService(db);
    accountService.create(
        id,
        email,
        bcrypt.hashSync(password, process.env.SALT_ROUNDS),
    ).then(() => res.json({id, email})).catch(() => {
      res.json({error: 'error'});
    },
    );
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static delete(req, res) {
    const accountService = new EmployeeAccountService(db);
    accountService.delete(req.body.recordId);
  }
}

module.exports = AccountController;
