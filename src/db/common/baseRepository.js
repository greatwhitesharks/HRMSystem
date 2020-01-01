const {snakeCase} = require('lodash');
/**
 * Base Repository
 */
class BaseRepository {
  /**
     *
     * @param {*} table
     * @param {*} attributes
     * @return {*} prepared string
     */
  prepareForSelect(table, attributes) {
    let sql = `SELECT * FROM ${table} WHERE `;

    const pairs = [];

    for (let i = 0; i < attributes.length; i++) {
      pairs.push(`${attributes[i]} = ?`);
    }
    sql += pairs.join(' AND ');
    return sql;
  }
  /**
 *  Create an instance of the base repository
 * @param {Object} db
 * @param {String} table
 */
  constructor(db, table) {
    this.table = table;
    this.db= db;
  }

  /**
   * Find entities matching the query object
   * @param {*} queryObject
   * @param {Number} limit
   */
  async find(queryObject, limit = false) {
    const flat = [...Object.values(queryObject)];
    let sql = this.prepareForSelect(this.table,
        Object.keys(queryObject).map((e)=>snakeCase(e)));
    if (limit !== false) {
      sql += ` limit ${limit}`;
    }
    
    const result = await this.db.execute(sql, flat);
    return result[0];
  }

  /**
   *
   * @param {*} queryObject
   */
  async findOne(queryObject) {
    return (await this.find(queryObject, 1))[0];
  }

  /**
   *  Create the entity if it does not exsit, otherwise update
   * @param {*} object
   */
  async save(object) {
    // TODO : Prepared statements, extend keys for uniquenes
    const tuples = [];
    for (const key of Object.keys(object)) {
      tuples.push(`${snakeCase(key)} = ?`);
    }
    const sql = `INSERT INTO ${this.table} (${[
      ...Object.keys(object),
    ].join(',')}) `+
    `VALUES (${[...Object.values(object).map((x)=>'?')].join(',')}) ON `+
    ` DUPLICATE KEY UPDATE ` +
    tuples.join(',');
    return await this.db.execute(sql,
        [...Object.values(object), ...Object.values(object)]);
  }

  /**
   * Delete the entity
   * @param {*} object
   */
  async delete(object) {
    const tuples = [];
    for (const key of Object.keys(object)) {
      tuples.push(`${snakeCase(key)} = ?`);
    }
    const sql = `DELETE FROM ${this.table} WHERE ${tuples.join(' AND ')}`;
    return await this.db.execute(sql, [...Object.values(object)]);
  }
}


module.exports = BaseRepository;
