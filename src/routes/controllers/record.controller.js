const db = require('../../db');
const EmployeeRecordService = require('../../services/employeeRecord.service');
const CustomAttributeService =
  require('../../services/customAttribute.service');
const AddressRepository = require('../../repositories/address.repository');
const {camelCase} = require('lodash');
const DependentRepository = require('../../repositories/dependent.repository');
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
      let attributes = await attribService.getAttributes();
      attributes = attributes.map((e) => camelCase(e));

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
        const dependentRepo = new DependentRepository(db);
        dependentRepo.createMany(dependents);
      }

      return record;
    })()
        .then((record) => res.json({id: record.id}))
        .catch((e)=>res.json({error: e}));
  }

  async delete(id){
      const recordService= new EmployeeRecordService(db);
      await recordService.delete(id);


  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async view(req, res, next) {
    const recordService = new EmployeeRecordService(db);
    res.json((await recordService.getById(req.params.id)));

  }
}

module.exports = RecordController;
