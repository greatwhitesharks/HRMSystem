const BaseRepository = require('../db/common/baseRepository');
const sqlHelper = require('../helpers/sql.helper');
const {snakeCase} = require('lodash');

/**
 * Dependent Repository
 */
class DependentRepository extends BaseRepository {
  /**
   *
   * @param {*} db
   */
  constructor(db) {
    super(db, 'dependent_information');
  }

  /**
   *
   * @param {Dependent[]} dependents
   */
  async saveMany(dependents) {
    const sql = sqlHelper.prepareForSave(this.table,
        Object.keys(dependents[0]).map((key) =>{
          return snakeCase(key);
        }),
        dependents.length);

    const flat = [];

    for (const dependent of dependents) {
      flat.push(...Object.values(dependent));
    }

    return await this.db.execute(sql, flat);
  }

  /**
   *
   * @param {Number[]} ids
   */
  async deleteByIds(ids) {

    const values = ids.foreach((id) => {
      return `id = ?`;
    }).join(' OR ');

    const sql = `DELETE FROM ${this.table} WHERE ${values}`;
    return await this.db.execute(sql, ids);
  }
}

module.exports = DependentRepository;
