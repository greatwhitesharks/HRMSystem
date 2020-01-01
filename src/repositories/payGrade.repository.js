const BaseRepository = require('../db/common/baseRepository');

//create , delete methods check krnna wenwa

class PayGradeRepository extends BaseRepository {
    /**
     *
     * @param {*} db
     */
    constructor(db) {
      super(db, 'paygrade');
    }
  }
  
module.exports = PayGradeRepository;
