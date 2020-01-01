const BaseRepository = require('../db/common/baseRepository');
const CustomAttributeRepository = require('./customAttribute.repository');
const valueColumns = require('../helpers/customAttribute.helper').valueColumns;
const prepareForInsert =
  require('../helpers/sql.helper').prepareForInsert;
const {camelCase} = require('lodash');

/**
 * Custom Attribute Repository
 */
class CustomAttributeValueRepository extends BaseRepository {
  /**
   *
   * @param {*} db
   */
  constructor(db) {
    super(db, 'custom_attribute_value');
  }

  /**
   * @param {*} recordId
   * @param {*} object
   */
  async createMany(recordId, object) {
    if (!Object.keys(object).length) {
      throw new Error('Given object is empty');
    }
    const query = prepareForInsert('custom_attribute_value',
        valueColumns,
        Object.keys(object).length,
    );

    const flat = [];

    const attributeRepo = new CustomAttributeRepository(this.db);
    const attributes = await attributeRepo.getAttributes(['names']);
    for (const attribute of attributes) {
      flat.push(id, attribute, object[camelCase(attribute.name)]);
    }
    (query);
    await this.db.execute(query, flat);
    return customAttributes;
  }
}

module.exports = CustomAttributeValueRepository;
