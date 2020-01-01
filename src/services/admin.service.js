const JobTitleRepository =require('../repositories/jobTitle.repository');
const OrganizationRepository =require('../repositories/organization.repository');
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

  async updateOrganization(data) {
    // TODO: Refactor this and getId
    // Insert employee record
    const orgRepo = new OrganizationRepository(this.db);

    await orgRepo.save(data);

    const organization = {};

    Object.assign(organization, data);

    return new Organization(organization);
  }

  async viewOrganization() {
    
    const orgRepo = new OrganizationRepository(this.db);

    const organization = await orgRepo.view();

    return new Organization(organization);
  }
  async findPayGrade(paygrade){
    const paygradeRepo = new PayGradeRepository(this.db);
    await paygraderepo.find({
      name:paygrade
    });
    return true // need to return a boolean value from the result
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
