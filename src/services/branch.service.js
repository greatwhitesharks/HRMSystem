const BaseRepository =
  require('../db/common/baseRepository');
/**
 * Branch Service
 */
class BranchService {
  /**
   *
   * @param {*} db
   */
  constructor(db) {
    this.db = db;
  }

  /**
   *
   * @param {*} name
   * @param {*} line1
   * @param {*} line2
   * @param {*} city
   * @param {*} region
   * @param {*} country
   * @param {*} currency
   */
  async create(
      name,
      line1,
      line2,
      city,
      region,
      country,
      currency,
  ) {
    addressRepo = new AddressRepository(this.db);
    const addressId = await addressRepo.save({
      line1,
      line2,
      city,
      region,
      country,
    });
    branchRepo = new BaseRepository(this.db, 'branch');

    await branchRepo.save({
      name,
      addressId,
      currency,
    });
  }

  /**
   *
   * @param {*} branchId
   */
  async delete(branchId) {
    branchRepo = new BaseRepository(this.db, 'branch');
    await branchRepo.delete({
      id: branchId,
    });
  }
}

module.exports = BranchService;


