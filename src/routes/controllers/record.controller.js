const db = require('../../db');
const EmployeeRecordService = require('../../services/employeeRecord.service');
const CustomAttributeService =
  require('../../services/customAttribute.service');
const AddressRepository = require('../../repositories/address.repository');
const {camelCase} = require('lodash');
const DependentService = require('../../services/dependent.service');
const path = require('path');

/**
 *
 */
class RecordController {
  /**
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
  static create(req, res, next) {
    // TODO : Validation
    // Extract default data from request
    (async () => {
      const {
        firstName,
        middleName,
        lastName,
        maritalStatus,
        employmentType,
        jobTitle,
        paygrade,
        supervisorId,
        birthday,
        departmentId,
        sex,
      } = req.body;

      // Extract custom attributes from request
      const attribService = new CustomAttributeService(db);
      let attributes = await attribService.getAttributes(['name']);
      attributes = attributes.map((e) => camelCase(e.name));
      console.log(req.file);
      let photo = process.env.APP_URL || 'http://localhost:3000' + '/upload/'+req.file.filename;
      let salary = '';
      const custom = {};

      for (const attribute of attributes) {
        custom[attribute] = req.body[attribute] || null;
      }
      // Create record
      const recordService = new EmployeeRecordService(db);
 
      const record = await recordService.create({
        firstName,
        middleName,
        lastName,
        maritalStatus: maritalStatus || 'single',
        employmentType,
        jobTitle,
        paygrade,
        supervisorId,
        birthday,
        photo,
        salary,
        departmentId,
        sex: (sex || 'male'),
      },
      custom,
      );


      const addressRepo = new AddressRepository(db);
      // Code for a single address
      const {
        line1,
        line2,
        city,
        region,
        country,
      } = req.body;

      console.log({line1,
        line2,
        city,
        region,
        country});
      const address = {
        line1,
        line2,
        city,
        region,
        country,
      };

      const addressId = (await addressRepo.save(address)).id;
      await addressRepo.addAddressToEmployee(addressId, record.id);

      return record;
    })() .then((record) => res.json({id: record.id}))
        .catch((e)=>res.json({error: e}));
  }
//this is a procedeural implementation to auto  delete account when record employment type changed to retired/etc...
 //this method won't delete records except delete accounts and change record satus.
  async delete(id){
      const recordService= new EmployeeRecordService(db);
      await recordService.delete(id);

  }
  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async saveDependentInfo(req, res, next) {
    //  Code to add dependent information
  
    if (req.body) {
      const dependents = [];
      for (const dependent of req.body) {
        dependents.push({
          id: dependent.id || null,
          firstName: dependent.firstName,
          middleName: dependent.middleName || '',
          lastName: dependent.lastName,
          birthdate: dependent.birthday,
          relation: dependent.relation,
          employeeRecordId: req.params.id,
        });
      }
      const dependentService = new DependentService(db);
      await dependentService.saveMany(dependents);
      return res.json({status: 'success'});
    }
  }


  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async deleteDependentInfo(req, res, next) {
    //  Code to add dependent information
    if (req.body.dependentIds) {
      const dependents = req.body.dependentIds;
      const dependentService = new DependentService(db);
      await dependentService.deleteByIds(dependents);
      return res.json({status: 'success'});
    }
  }
  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async view(req, res, next) {
    const recordService = new EmployeeRecordService(db);
    return res.json((await recordService.getById(req.params.id)));
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async search(req, res, next) {
    // Todo : get the requesters branch and constrain the search
    const recordService = new EmployeeRecordService(db);
    const results = await recordService.searchInBranch(
        req.body.branch,
        req.body.term,
        req.body.page || 0,
    );

    res.json(results);
  }
}

module.exports = RecordController;
