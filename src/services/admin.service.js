const BaseRepository =
  require('../db/common/baseRepository');
const OrganizationRepository =require('../repositories/organization.repository');


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
    
    const orgRepo=new OrganizationRepository(this.db);
    return await orgRepo.view();
  }

  async addPayGrade(
    name,
    min_salary,
    max_salary,
    branchId,
  ) {
  const paygradeRepo = new BaseRepository(this.db,'paygrade');
  await paygradeRepo.save({
    name,
    min_salary,
    max_salary,
    branch_id:branchId,
  });
  }
  
  async removePayGrade(paygrade) {

    const paygradeRepo = new PayGradeRepository(this.db);

    await paygraderepo.delete({
      name:paygrade
    });
  }

  async changeLeaveLimit(
      type,
      paygrade,
      leave_count,
      resets,
  ) {
    const limitrepo = new BaseRepository(this.db,'paygrade_leave_limit');
    await limitrepo.save({
      type,
      paygrade,
      leave_count,
      resets,
    });
  }
}

module.exports = AdminService;
