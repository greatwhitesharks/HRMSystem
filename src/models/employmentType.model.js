const EmploymentTypeService = require('../services/employmentType.service');
const db = require('../db');

/** Class representing information about an employeee */
class employmentType {
  /**
   * Create an EmployeeRecord object with the given data
   * @param {Object} data - The data of the record.
   */
  constructor(data) {
    Object.assign(this, data);
    Object.seal(this);
  }

  /**
   *
   */
  get type() {
    //  Fetch employment types from database
    if (this._type) {
      return this._type;
    }
  }

  /**
   * @param {Object} type
   */
  set type(empType) {
    this.type = empType.type;
    this._type = empType;
  }

  // /**
  //  *
  //  */
  // get dependentInformation() {
  //   // Fetch dependentInfromation from database
  //   if (this._dependentInformation) {
  //     return this._dependentInformation;
  //   }
  //   const ds = new DependentService(db);
  //   this._dependentInformation = ds.getDependents(this.id);
  //   return this._dependentInformation;
  // }

  // /**
  //  *
  //  */
  // get addresses() {
  //   // Fetch address data from database
  //   if (this._addresses) {
  //     return this._addresses;
  //   }
  //   const recordService = new EmployeeRecordService(db);
  //   this._addresses = await recordService.getAddresses(this.id);
  // }
}

module.exports = EmployeeRecord;
