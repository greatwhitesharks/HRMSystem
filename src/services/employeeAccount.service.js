const EmployeeAccountRepository =
  require('../repositories/employeeAccount.repository');
const EmployeeRecordService =
  require('../services/employeeRecord.service');
const EmployeeAccount = require('../models/employeeRecord.model');

/**
 * Employee Account Service
 */
/**
 *
 */
class EmployeeAccountService {
  /**
   *
   * @param {*} db
   */
  constructor(db) {
    this.db = db;
  }

  /**
   *
   * @param {*} recordId
   */
  async delete(recordId) {
    const accountRepo = new EmployeeAccountRepository(this.db);

    await accountRepo.delete({
      employee_record_id: recordId,
    });
  }
  /**
   *
   * @param {*} employeeRecordId
   * @param {*} email
   * @param {*} password
   */
  async create(employeeRecordId, email, password) {
    // hash password

    const accountRepo = new EmployeeAccountRepository(this.db);

    await accountRepo.create({
      id: employeeRecordId,
      email,
      password,
    });

    return new EmployeeAccount(
        employeeRecordId,
        email,
        password,
    );
  }

  /**
   *
   * @param {*} email
   */
  async getRecordAccountByEmail(email) {
    const accountRepo = new EmployeeAccountRepository(this.db);
    let record = null;
    const account = await accountRepo.findOne({
      email,
    }) || null;

    if (account) {
      const recService = new EmployeeRecordService(this.db);
      record = await recService.getById(account.employee_record_id);
    }
    return {
      account,
      record,
    };
  }
  /**
   * 
   * @param {*} id 
   */
  async getRoles(id, jobTitle = null) {
    let ret = (await this.db.execute(`
    Select role from employee_account_has_role e where e.employee_record_id = ?
    `, [id]))[0];
    const roles = [];
    for (const e of ret) {
      if (!roles.includes(e.role)) {
        roles.push(e.role);
      }
    }
    ret = (await this.db.execute(`
    Select role from job_title_has_role e where e.job_title = ?
    `, [id]))[0];

    for (const e of ret) {
      if (!roles.includes(e.role)) {
        roles.push(e.role);
      }
    }
    return roles;
  }
  /**
 *
 * @param {*} id
 */
  async getPermissions(id, jobTitle = null) {
    const perms = [];
    const roles = await this.getRoles(id, jobTitle);
    for (const role of roles) {
      const temp = await (new (require('../services/roleAndPermission.service'))(this.db)).getPermissionsInRole(role);
      for (const p of temp) {
        const pt = `${p.action}_${p.entity}_${p.group}`;
        console.log(pt);
        if (!perms.includes(pt)) {
          perms.push(pt);
        }
      }
    }
    return {roles, perms};
  }
}

module.exports = EmployeeAccountService;
