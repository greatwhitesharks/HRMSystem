const EmpTypeService =
  require('../../services/employeeAccount.service');
const db = require('../../db');
/**
 *
 */
class EmpTypeController {
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
  
      const empTypeService = new EmpTypeService(db);
      empTypeService.create(
          id,
          email,
          password,
      ).then(() => res.json({id, email})).catch(() => {
        res.json({error: 'error'});
      },
      );
    }
  }
  
  module.exports = EmpTypeController;