const CustomAttributeRepository =
  require('../repositories/customAttribute.repository');
/**
 * Custom Attribute Service
 */
class CustomAttributeService {
  /**
   *
   * @param {*} db
   */
  constructor(db) {
    this.db = db;
  }

  /**
   *
   */
  async getAttributes(columns = ['name']) {
    const customAttributeRepo = new CustomAttributeRepository(this.db);
    return await customAttributeRepo.getAttributes(columns);
  }
}

module.exports = CustomAttributeService;


