const EmployeeAccountService =
  require('../../services/employeeAccount.service');
const db = require('../../db');
/**
 *
 */
class AccountController {
  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static create(req, res) {
    const {
      id,
      email,
      password,
    } = req.body;

    const accountService = new EmployeeAccountService(db);
    accountService.create(
        id,
        email,
        password,
    ).then(() => res.json({id, email})).catch(() => {
      res.json({error: 'error'});
    },
    );
  }
  static changeJob(res,req,next){
    const jobService = new EmployeeAccountService(db);
    const id = req.body.id;  
    const job= req.body.job;
       //might need to change above two statements to get the right attributes
    const emp= jobService.changeJob(id,job);
    res.render('/changedjob',{
        pageTitle: 'Changed',
        job: job
    });        
};
}

module.exports = AccountController;
