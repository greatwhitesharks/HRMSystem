const BaseRepository = require('../db/common/baseRepository');

//create , delete methods check krnna wenwa

class JobTitleRepository extends BaseRepository {
    /**
     *
     * @param {*} db
     */
    constructor(db) {
      super(db, 'paygrade');
    }
  }
  
module.exports = JobTitleRepository;
