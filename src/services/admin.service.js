
// const JobTitleRepository =require('../repositories/jobTitle.repository');
// const PayGradeRepository =require('../repositories/payGrade.repository');
const RoleRepository =require('../repositories/role.repository');

const BaseRepository =
  require('../db/common/baseRepository');
const OrganizationRepository =require('../repositories/organization.repository');

const PayGradeLeaveLimitRepository =require('../repositories/payGradeLeaveLimit.repository');


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

  async changeLeaveLimit(type,paygrade,leavecount,reset) {
    const paylimitRepo = new PayGradeLeaveLimitRepository(this.db);

    await paylimitrepo.change({ //need to implement this change method in db
      type:type,
      paygrade,
      leavecount,
      reset
    });
  }
  async assignRole(id,role){
    const roleRepository=new RoleRepository(this.db);
    await roleRepository.assignRole(id,role);
  }
  async deleteAssignedRole(id,role){
    const roleRepository=new RoleRepository(this.db);
    await roleRepository.deleteAssignedRole(id,role);
  }
  async getRoles(){
    const roleRepository=new RoleRepository(this.db);
    await roleRepository.getRoles();
  }
}

module.exports = AdminService;
