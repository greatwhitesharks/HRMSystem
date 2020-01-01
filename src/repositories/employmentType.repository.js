const BaseRepository = require('../db/common/baseRepository');

/**
 * Employee Record Repository
 */
class EmploymentTypeRepository extends BaseRepository {
  /**
   * Create an EmployeeRecordRepository object
   * @param {*} db
   */
  constructor(db) {
    super(db, 'employement_type');
  }


  /**
   *  Create the entity if it does not exsit, otherwise update
   * @param {*} object
   */
  async save(object) {
    return await this.db.execute(`INSERT into ${this.table} (
      type
    ) VALUES (?) 
    `, [
      object.type || null,
    ]);
  }
  /**
   * Delete
   */
  async delete() {
    return await this.db.execute(`DELETE from ${this.table} 
      WHERE type
      = (?) 
    `, [
      object.type || null,
    ]);
  }
}

module.exports = EmploymentTypeRepository;