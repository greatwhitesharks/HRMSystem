const JobTitleRepository =require('../repositories/jobTitle.repository');
const PayGradeRepository =require('../repositories/payGrade.repository');
const EmployeeAccount = require('../models/employeeRecord.model'); //please check this one


class AdminService {
  /**
   *
   * @param {*} db
   */
  constructor(db) {
    this.db = db;
  }
  async findJob(job){
    const jobRepo = new JobTitleRepository(this.db);
    await jobrepo.find({
      title:job
    });
    return true // need to return a boolean value from the result
  }

  async addJobTitle(job,salary) {

    const jobRepo = new JobTitleRepository(this.db);

    await jobrepo.create({
      title:job,
      salary
    });

    return new JobTitle(
        job,
        salary
    );
  }
  
  async removeJobTitle(job) {

    const jobRepo = new JobTitleRepository(this.db);

    await jobrepo.delete({
      title:job
    });
  }

  async findPayGrade(job){
    const paygradeRepo = new PayGradeRepository(this.db);
    await paygraderepo.find({
      title:job
    });
    return true // need to return a boolean value from the result
  }

  async addPayGrade(job,salary) {

    const jobRepo = new PayGradeRepository(this.db);

    await jobrepo.create({
      title:job,
      salary
    });

    return new PayGrade(
        job,
        salary
    );
  }
  
  async removePayGrade(job) {

    const jobRepo = new PayGradeRepository(this.db);

    await jobrepo.delete({
      title:job
    });
  }
}

module.exports = AdminService;
