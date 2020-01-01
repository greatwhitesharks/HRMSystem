/**
 * Employment Type Service
 */
const EmploymentTypeRepository =
  require('../repositories/employmentType.repository');
const EmploymentType = require('../models/employmentType.model');

/**
 *
 */
class EmploymentTypeService {
  /**
   *
   * @param {*} db
   */
  constructor(db) {
    this.db = db;
  }

  /**
   *
   * @param {*} data
   * @param {*} custom
   */
  async create(data, custom) {
    // TODO: Refactor this and getId
    // Insert employee record
    const typeRepo = new EmploymentTypeRepository(this.db);

    data.type = (await typeRepo.save(data))[0].insertType;

    const empType = {};

    Object.assign(empType, data);

    return new EmploymentType(empType);
  }

  async delete(data, custom) {
    // TODO: Refactor this and getId
    // Insert employee record
    const typeRepo = new EmploymentTypeRepository(this.db);

    data.type = (await typeRepo.delete(data)); //Please check this line
  }

}

module.exports = EmploymentTypeService;
