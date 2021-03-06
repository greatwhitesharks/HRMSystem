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
   
    const attributes = await attributeRepo.getAttributes(['name']);
    for (const attribute of attributes) {
    
      console.log('IN' + object[camelCase(attribute.name)]);
      flat.push( attribute.name, object[camelCase(attribute.name)] ||'-',recordId);
    }

    const result =await this.db.execute(query, flat);
 
    return true;
  }
}

module.exports = CustomAttributeValueRepository;
