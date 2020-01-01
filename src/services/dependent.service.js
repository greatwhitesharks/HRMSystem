const DependentRepository = require('../repositories/dependent.repository');
const Dependent = require('../models/dependent.model');


/**
 * Dependent Service
 */
class DependentService {
  /**
   * Creates a DependentService object
   * @param {*} db
   */
  constructor(db) {
    this.db = db;
  }

  /**
   * Get dependent objects that belongs to a record
   * @param {*} recordId
   */
  async getDependents(recordId) {
    const dependentRepo = new DependentRepository(this.db);
    const result = await dependentRepo.find({
      employee_record_id: recordId,
    });

    const dependents = [];

    for (const tuple of result) {
      dependents.push(new Dependent(tuple));
    }

    return dependents;
  }

  /**
   *
   * @param {*} ids
   */
  async deleteByIds(ids) {
    const dependentRepo = new DependentRepository(this.db);
    await dependentRepo.deleteByIds(ids);
  }

  /**
   *
   * @param {*} dependents
   */
  async saveMany(dependents) {
    const dependentRepo = new DependentRepository(this.db);
    await dependentRepo.saveMany(dependents);
  }
}

module.exports = DependentService;
