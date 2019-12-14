const BaseRepository = require('../db/common/baseRepository');

/**
 * Address Repository
 */
class AddressRepository extends BaseRepository {
  /**
   *
   * @param {*} db
   */
  constructor(db) {
    super(db, 'address');
  }

  /**
   * Creates/updates address and returns the address object with id
   * @param {Object} address
   */
  async save(address) {
    //  TODO:Remove error after test

    const result = await this.db.execute(`Select SAVE_ADDRESS(?,?,?,?,?,?) as id`, [
      address.id || null,
      address.line1,
      address.line2,
      address.city,
      address.region,
      address.country,
    ]);
    return result[0][0];
  }

  /**
   * Add the given address to the given employee
   * @param {*} address
   * @param {*} employee
   */
  async addAddressToEmployee(address, employee) {
    return await this.db.execute(`INSERT INTO employee_record_has_address 
    VALUES(${employee}, ${address});`);
  };

  /**
   * Remove the given address from the given employee
   * @param {*} address
   * @param {*} employee
   */
  async removeAddressFromEmployee(address, employee) {
    return await this.db.execute(`DELETE FROM employee_record_has_address WHERE 
    employee_record_id = ${employee} AND address_id =${address};`);
  }
}

module.exports = AddressRepository;
