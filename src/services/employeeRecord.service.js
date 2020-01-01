/**
 * Employee Record Service
 */
const EmployeeRecordRepository =
  require('../repositories/employeeRecord.repository');
const CustomAttributeValueRepository =
  require('../repositories/customAttributeValue.repository');
const EmployeeRecord = require('../models/employeeRecord.model');
const Address = require('../models/address.model');
const DependentService = require('../services/dependent.service');
const AddressRepository = require('../repositories/address.repository');
const {camelCase} = require('lodash');
/**
 *
 */
class EmployeeRecordService {
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
    const recordRepo = new EmployeeRecordRepository(this.db);

    data.id = (await recordRepo.save(data))[0].insertId;


    // TODO : Do the filtering here not in the repository
    const customRepo = new CustomAttributeValueRepository(this.db);
    let attributes = {};
    if (Object.keys(custom).length) {
      attributes = await customRepo.createMany(data.id, custom);
    }

    const employee = {};

    Object.assign(employee, data);
    Object.assign(employee, attributes);

    return new EmployeeRecord(employee);
  }

  /**
   *
   * @param {*} id
   */
  async getById(id) {
    const recordRepo = new EmployeeRecordRepository(this.db);

    const result = await recordRepo.findOne(
        {
          id,
        },
    );

    const employee = {};

    if (result) {
      Object.assign(employee, result);

      // Populate the custom attributes
      const customAttribValRepo = new CustomAttributeValueRepository(this.db);
      const attributes = await customAttribValRepo.find({
        employee_record_id: id,
      });

      for (const attribute of attributes) {
        employee[camelCase(attribute.attribute_name)] = attribute.value;
      }


      const ds = new DependentService(this.db);
      employee.dependents = await ds.getDependents(id);
      employee.addresses = await this.getAddresses(id);
      return new EmployeeRecord(employee);
    } else {
      // Throw error
    }
  }

  //this is a procedeural implementation to auto  delete account when record employment type changed to retired/etc...
  async delete(id){
    const recordRepo = new EmployeeRecordRepository(this.db);
    recordRepo.delete(id);
  }


  /**
  *
  * @param {*} recordId
  */
  async getAddresses(recordId) {
    const repository = new AddressRepository(this.db);
    const results = await repository.getAddresses(recordId);
    const addresses = [];

    for (const result of results) {
      addresses.push(
          new Address(result),
      );
    }
    return addresses;
  }
}

module.exports = EmployeeRecordService;
