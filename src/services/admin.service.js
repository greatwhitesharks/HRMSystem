const JobTitleRepository =require('../repositories/jobTitle.repository');
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
}

module.exports = AdminService;
