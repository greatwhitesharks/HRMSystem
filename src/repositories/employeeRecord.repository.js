const BaseRepository = require('../db/common/baseRepository');

/**
 * Employee Record Repository
 */
class EmployeeRecordRepository extends BaseRepository {
  /**
   * Create an EmployeeRecordRepository object
   * @param {*} db
   */
  constructor(db) {
    super(db, 'employee_record');
  }


  /**
   *  Create the entity if it does not exsit, otherwise update
   * @param {*} object
   */
  async save(object) {
    return await this.db.execute(`INSERT into ${this.table} (
      id,
      first_name,
      middle_name,
      last_name,
      marital_status,
      employment_type,
      job_title,
      paygrade,
      supervisor_id,
      birthdate,
      employee_photo,
      department_id,
      sex
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?) 
    ON DUPLICATE KEY UPDATE
    first_name = VALUES(first_name),
    middle_name = VALUES(middle_name),
    last_name = VALUES(last_name),
    marital_status = VALUES(marital_status),
    employment_type = VALUES(employment_type),
    job_title = VALUES(job_title),
    paygrade = VALUES(paygrade),
    supervisor_id = VALUES(supervisor_id),
    birthdate = VALUES(birthdate),
    employee_photo = VALUES(employee_photo),
    department_id = VALUES(department_id),
    sex = VALUES(sex)
    `, [
      object.id || null,
      object.firstName,
      object.middleName,
      object.lastName,
      object.maritalStatus,
      object.employmentType,
      object.jobTitle,
      object.paygrade,
      object.supervisorId,
      object.birthday,
      object.photo,
      object.departmentId,
      object.sex,
    ]);
  }
  /**
   * Delete
   */
  async delete() {
    throw new Error('Employee records cannot be deleted');
  }

  /**
   *
   * @param {*} term
   * @param {*} branch
   * @param {*} limit
   * @param {*} offset
   */
  async search(term, branch, limit = null, offset = 0) {
    return await this.db.execute(`
      Select 
      first_name as firstName,
      last_name as lastName,
      employment_type as employementType,
      job_title as jobTitle,
      paygrade,
      employee_photo as employeePhoto,
      department.name as department,

      from ${this.table} LEFT JOIN department
      ON department_id = department.id
      JOIN branch on branch_id = branch.id
      where branch = ?
      AND
      (
        first_name LIKE %?%
        OR
        last_name LIKE %?%
      )
      LIMIT ?
      OFFSET ?
      `, [branch, term, term, limit, offset])[0];
  }
}

module.exports = EmployeeRecordRepository;
