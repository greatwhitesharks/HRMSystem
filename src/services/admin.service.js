const BaseRepository =
  require('../db/common/baseRepository');
const PayGradeRepository =require('../repositories/payGrade.repository');
const PayGradeLeaveLimitRepository =require('../repositories/payGradeLeaveLimit.repository');
const EmployeeAccount = require('../models/employeeRecord.model'); //please check this one


class AdminService {
  /**
   *
   * @param {*} db
   */
  constructor(db) {
    this.db = db;
  }

  async addJobTitle(
      title,
      salary,
  ) {
    const jobrepo = new BaseRepository(this.db,'job_title');
    await jobrepo.save({
      title,
      salary
    });
  }

  
  async removeJobTitle(job) {

    const jobRepo = new JobTitleRepository(this.db);

    await jobrepo.delete({
      title:job
    });
  }

  async addPayGrade(name,minsalary,maxsalary,branchid) {

    const paygradeRepo = new PayGradeRepository(this.db);

    await paygraderepo.create({
      name:name,
      minsalary,
      maxsalary,
      branchid
    });

    return new PayGrade(
      name,
      minsalary,
      maxsalary,
      branchid
    );
  }
  
  async removePayGrade(paygrade) {

    const paygradeRepo = new PayGradeRepository(this.db);

    await paygraderepo.delete({
      name:paygrade
    });
  }

  async changeLeaveLimit(type,paygrade,leavecount,reset) {
    const paylimitRepo = new PayGradeLeaveLimitRepository(this.db);

    await paylimitrepo.change({ //need to implement this change method in db
      type:type,
      paygrade,
      leavecount,
      reset
    });
  }
}

module.exports = AdminService;
