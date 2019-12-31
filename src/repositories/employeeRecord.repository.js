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
  async deleteExistence(id) {
    await this.db.execute('call deleteExistence(?)',[id]);
  }

}

module.exports = EmployeeRecordRepository;
//SELECT id,'from','to' from absence where employee_leave.employee_record_id in (select id from employee_leave,paygrade_leave_limit,employee_record where employee_record.id=employee_leave.employee_record_id and employee_record.paygrade =paygrade_leave_limit.paygrade and paygrade_leave_limit.leave_count>employee_leave.no_of_leaves and employee_record.department_id="")