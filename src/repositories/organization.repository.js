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
   *  Create the entity if it does not exsit, otherwise update
   * @param {*} object
   */
  async save(object) {
    return await this.db.execute(`INSERT into ${this.table} (
      name,
      registration_no,
      root_branch_id
    ) VALUES (?,?,?) 
    ON DUPLICATE KEY UPDATE
    registration_no = VALUES(registration_no),
    root_branch_id = VALUES(root_branch_id)
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