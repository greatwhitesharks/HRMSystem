const EmpTypeService =
  require('../../services/employmentType.service');
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
      (async () => {
        const {
          type,
        } = req.body;
  
      const empTypeService = new EmpTypeService(db);
      
      const empType = await empTypeService.create(
          type,
      );
      
      return empType;
      //please check these parts .
      //                       _/|\_
    })()
        .then((empType) => res.json({"type": empType.type}))
        .catch((e)=>res.json({error: e}));
      
    }

    static delete(req, res) {
      (async () => {
        const {
          type,
        } = req.body;
  
      const empTypeService = new EmpTypeService(db);
      
      return await empTypeService.delete(
          type,
      );
      
      //please check these parts .
      //                       _/|\_
    })()
        .then((empType) => res.json({"type": "deleted"}))
        .catch((e)=>res.json({error: e}));
      
    }

  }
  
  module.exports = EmpTypeController;