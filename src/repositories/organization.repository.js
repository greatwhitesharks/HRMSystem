const BaseRepository = require('../db/common/baseRepository');

/**
 * Employee Record Repository
 */
class OrganizationRepository extends BaseRepository {
  /**
   * Create an EmployeeRecordRepository object
   * @param {*} db
   */
  constructor(db) {
    super(db, 'organization');
  }


  /**
   *  Update the object data
   * @param {*} object
   */
  async save(object) {
    return await this.db.execute(`UPDATE ${this.table} SET (
      name = (?),
      registration_no = (?),
      root_branch_id = (?)
    ) LIMIT 1
    `, [
      object.name || null,
      object.registration_no,
      object.root_branch_id,
    ]);
  }

  async view() {
    return await this.db.execute(`SELECT * FROM ${this.table} LIMIT 1`).then(async (result)=>{
        var entities=[];
        Object.keys(result[0]).forEach(async (key)=> {
        var entity={};
        entity["name"]=result[0][key].name;
        entity["registration_no"]=result[0][key].registration_no;
        entity["root_branch_id"]=result[0][key].root_branch_id;
        entities.push(entity);  
        });
        return entities;
      });
  }

}

module.exports = EmploymentTypeRepository;