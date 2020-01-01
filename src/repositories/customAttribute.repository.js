const BaseRepository = require('../db/common/baseRepository');

/**
 * Custom Attribute Repository
 */
class CustomAttributeRepository extends BaseRepository {
  /**
   *
   * @param {*} db
   */
  constructor(db) {
    super(db, 'custom_attribute');
  }

  /**
   * 
   * @param {String[]} columns
   */
  async getAttributes(columns) {
    // TODO: Decide whether to store or not
    if (this.constructor.attributes) {
      return this.constructor.attributes;
    }
    columns = columns.join(', ');
    const result = await this.db.execute(`SELECT ${columns} FROM custom_attribute`);
    const attributes = result[0];
    this.constructor.customAttributes = attributes;
    return attributes;
  }
}


module.exports = CustomAttributeRepository;
