/**
 * Employment Type Service
 */
const OrganizationRepository =
  require('../repositories/organization.repository');
const Organization = require('../models/organization.model');

/**
 *
 */
class OrganizationService {
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
    const orgRepo = new OrganizationRepository(this.db);

    data.type = (await orgRepo.save(data))[0].insertType;

    const organization = {};

    Object.assign(organization, data);

    return new Organization(organization);
  }

}

module.exports = OrganizationService;
