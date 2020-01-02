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

  async createAttribute(name, defaultValue = '-', type="text") {
    const customAttributeRepo = new CustomAttributeRepository(this.db);
    return await customAttributeRepo.save({
      name,
      default:defaultValue,
      type
    });
  }

  async deleteAttribute(name, defaultValue = '-', type="text") {
    const customAttributeRepo = new CustomAttributeRepository(this.db);
    return await customAttributeRepo.delete({
      name,
    });
  }
}

module.exports = CustomAttributeService;


