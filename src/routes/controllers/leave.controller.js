const LeaveService = require('../../services/absence.service');
const db = require('../../db');
/**
 *
 */
class LeaveController {
  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static async superviseLeave(req, res) {
    const {
      leaveId,
      supervisorId,
      status,
    } = req.body;

    const leaveService= new LeaveService(db);
    const leave = await leaveService.getById(leaveId);

    if (status === 'accept') {
      leaveService.approveLeave(leave, supervisorId);
    } else if (status === 'decline') {
      leaveService.declineLeave(leave, supervisorId);
    }
  }
  //This method return employee detatils under superviser
  static async getLeaveInfoAll(req,res){
    //TODO implement using seesion superviserId
     const  leaveService= new LeaveService(db);
      var supervisorId=2;//for test purpses
      var leaveInfo=await leaveService.getLeaveInfoAll(supervisorId);
      res,json(leaveInfo);
  }
static async getLeaveInfo(req,res){
// TODO implement using seesion employeeRecordId
  const leaveService= new LeaveService(db);
  var employeeRecordId=1; //for test used this.
  res.json(await leaveService.getLeaveInfo(employeeRecordId));
  
}

static async applyLeave(req,res){
  // const {id,
  //   type,
  //   from,
  //   to,
  //   comment}=req.body;
  var id=1; //text purpouses TODO delete after intergrate ui
  var type="annual";
  var from='2020-01-02';
  var to='2020-01-05';
  var comment="sdsdsd"
    const leaveService= new LeaveService(db);
    var stmt=await leaveService.applyLeave(id,type,from,to,comment);
    res.json({
      "stmt":stmt
    });
}

}

module.exports = LeaveController;
