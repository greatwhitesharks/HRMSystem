const db = require('../../db');
const EmployeeRecordService = require('../../services/employeeRecord.service');
const CustomAttributeService =
  require('../../services/customAttribute.service');
const AddressRepository = require('../../repositories/address.repository');
const {camelCase} = require('lodash');
const DependentService = require('../../services/dependent.service');
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
        photo,
        salary,
        departmentId,
        sex,
      } = req.body;
      // Extract custom attributes from request
      const attribService = new CustomAttributeService(db);
      let attributes = await attribService.getAttributes(['name']);
      attributes = attributes.map((e) => camelCase(e.name));

      const custom = {};

      for (const attribute of attributes) {
        custom[attribute] = req.body[attribute];
      }
      // Create record
      const recordService = new EmployeeRecordService(db);

      const record = await recordService.create({
        firstName,
        middleName,
        lastName,
        maritalStatus,
        employmentType,
        jobTitle,
        paygrade,
        supervisorId,
        birthday,
        photo,
        salary,
        departmentId,
        sex,
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
    })()
        .then((record) => res.json({id: record.id}))
        .catch((e)=>res.json({error: e}));
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async saveDependentInfo(req, res, next) {
    //  Code to add dependent information
    if (req.body.dependents) {
      const dependents = [];
      for (const dependent of req.body.dependents) {
        dependents.push({
          firstName: dependent.firstName,
          middleName: dependent.middleName || '',
          lastName: dependent.lastName,
          birthdate: dependent.birthday,
          relation: dependent.relation,
          employeeRecordId: record.id,
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
