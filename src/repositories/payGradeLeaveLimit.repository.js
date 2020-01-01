const BaseRepository = require('../db/common/baseRepository');

//create , delete methods check krnna wenwa

class PayGradeLeaveLimitRepository extends BaseRepository {
    /**
     *
     * @param {*} db
     */
    constructor(db) {
      super(db, 'paygrade_leave_limit');
    }

    async change (){} //implement this  
  }
  
module.exports = PayGradeLeaveLimitRepository;
