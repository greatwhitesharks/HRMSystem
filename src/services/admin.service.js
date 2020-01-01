const JobTitleRepository =require('../repositories/jobTitle.repository');
const OrganizationRepository =require('../repositories/organization.repository');
const EmployeeAccount = require('../models/employeeRecord.model'); //please check this one


class AdminService {
  /**
   *
   * @param {*} db
   */
  constructor(db) {
    this.db = db;
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
}

module.exports = AdminService;
