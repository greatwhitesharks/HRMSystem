/**
 * Absence Service
 */
const AbsenceRepository = require('../repositories/absence.repository');
const EmployeeRecordService =
  require('../services/employeeRecord.service');
const Absence = require('../models/absence.model');
const {camelCase} = require('lodash');
/**
 *
 */
class AbsenceService {
  /**
   *
   * @param {Object} db
   */
  constructor(db) {
    this.db = db;
  }

  /**
   *
   * @param {Number} id
   */
  async getById(id) {
    const absenceRepo = new AbsenceRepository(db);

    // Find the absence object with id
    const result = await absenceRepo.find({
      id: id,
    });

    const data = {};

    // Convet snake_case properties to camelCase
    for (const key of Object.keys(result[0][0])) {
      data[camelCase(key)] = data[key];
    }
    return new Absence(data);
  }

  /**
   * Attempts to approve leave using supervisorId
   * @param {Number} leaveId
   * @param {Number} requesterId
   * @return {Absence} leave
   * @throws
   */
  async approveLeave(leaveId, requesterId) {
    const absenceRepo = new AbsenceRepository(db);
    const leave = this.getById(leaveId);

    if (canModifyLeaveState(leave, requesterId)) {
      leave.supervisor = requesterId;
      leave.status = 'approved';
      await absenceRepo.save(leave);
      return leave;
    } else {
      throw new Error('Provided supervisorId does not belong to supervisor');
    }
  }

  /**
   * Attempts to decline leave using
   * @param {Number} leaveId
   * @param {Number} requesterId
   * @return {Absence} leave
   */
  async declineLeave(leaveId, requesterId) {
    const leave = this.getById(leaveId);
    const absenceRepo = new AbsenceRepository(db);

    if (this.canApproveDeclineLeave(leave, requesterId)) {
      leave.supervisor = requesterId;
      leave.status = 'declined';
      await absenceRepo.save(leave);
      return leave;
    } else {
      throw new Error('Provided supervisorId does not belong to supervisor');
    }
  }

  /**
   * Check if the requester with {requesterID} can approve/decline leave
   * @param {Absence} leave
   * @param {Number} requesterId
   */
  async canApproveDeclineLeave(leave, requesterId) {
    const employee = EmployeeRecordService.getById(leave.employeeRecordId);
    return (employee.supervisorId === requesterId);
  }

  async getLeaveInfoAll(supervisorId){
  const absenceRepo = new AbsenceRepository(this.db);
      return await leveInfoAll;
  }
  async getLeaveInfo(employeeRecordId){
    const absenceRepo = new AbsenceRepository(this.db);
    return await absenceRepo.getLeaveInfo(employeeRecordId);

  /**
   *
   * @param {*} supervisorId
   */
  async getLeaveInfo(supervisorId) {
    availableLeave = getPaygradeLeaveCount(leaveId) -
      getTakenLeavesValue(leaveId);

    // TODO IMPLEMENT LEAVE INFO RETRIEVE
    return leveInfo;
  }


  /**
   *
   * @param {*} employeeRecordId
   */
  async getLeaveStatus(employeeRecordId) {
    const attr='status';
    const absenceRepo = new AbsenceRepository(this.db);
    return await absenceRepo.findOneByOne(attr, employeeRecordId);
  }
  async isAvailableLeave(id,type){
    const absenceRepo = new AbsenceRepository(this.db);
    return await absenceRepo.isAvailableLeave(id,type);
  }

  async applyLeave(id,type,from,to,comment){
    const absenceRepo = new AbsenceRepository(this.db);
    var stmt=await this.isAvailableLeave(id,type);
    if (stmt==true){
    var stmt=await absenceRepo.applyLeave(id,type,from,to,comment);
    if (stmt=='err'){
    return "can not apply 2 leaves for same period";
    }
    return "Request Pending.";
    }
    else{
      return "No left Leaves for This type.";
    }
  }
}

module.exports = AbsenceService;
