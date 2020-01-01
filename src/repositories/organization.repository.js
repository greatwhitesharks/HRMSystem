const BaseRepository = require('../db/common/baseRepository');

/**
 * Employee Record Repository
 */
class OrganizationRepository extends BaseRepository {
  /**
   * Create an EmployeeRecordRepository object
   * @param {*} db
   */
  constructor(db) {
    super(db, 'organization');
  }


  /**
   *  Update the object data
   * @param {*} object
   */
  async save(object) {
    return await this.db.execute(`UPDATE ${this.table} SET (
      name = (?),
      registration_no = (?),
      root_branch_id = (?)
    ) LIMIT 1
    `, [
      object.name || null,
      object.registration_no,
      object.root_branch_id,
    ]);
  }

  async view() {
    const data = this.db.execute(`SELECT * FROM ${this.table} LIMIT 1`, [
      
    ]);
  }
}

module.exports = EmploymentTypeRepository;