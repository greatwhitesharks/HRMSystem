const BaseRepository =
  require('../db/common/baseRepository');
/**
 * Department Service
 */
class DepartmentService {
  /**
   *
   * @param {*} db
   */
  constructor(db) {
    this.db = db;
  }

  /**
   *
   * @param {*} name
   * @param {*} branchId
   * @param {*} budget
   */
  async create(
      name,
      branchId,
      budget,
  ) {
    const repository = new BaseRepository(this.db, 'department');
    await repository.save({
      name,
      branchId,
      budget,
    });
  }

  /**
   *
   * @param {*} branchId
   */
  async getDepartments(branchId) {
    const repository = new BaseRepository(this.db, 'department');

    return (await repository.find({
      branch_id: branchId,
    }));
  }

  /**
   *
   * @param {*} departmentId
   */
  async delete(departmentId) {
    repository = new BaseRepository(this.db, 'department');
    await repository.delete({
      id: departmentId,
    });
  }
}

module.exports = DepartmentService;


