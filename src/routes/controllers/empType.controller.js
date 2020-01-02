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
    static async create(req,res){
      const empTypeService = new EmpTypeService(db);
      console.log(req.body);
      
      await empTypeService.create(
          req.body.employmentType,
      );
      req.flash('success','Employment Type Created Successfully')
      res.redirect('/empType/add');   
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