/**
 * Employment Type Service
 */
const BaseRepository =
  require('../db/common/baseRepository');
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

  async create(
    type,
) {
  const empRepo = new BaseRepository(this.db,'employement_type');
  await empRepo.save({
    type
  });
}

  async delete(data, custom) {
    // TODO: Refactor this and getId
    // Insert employee record
    const typeRepo = new EmploymentTypeRepository(this.db);

    typeRepo.delete(data); //Please check this line
  }

}

module.exports = EmploymentTypeService;
