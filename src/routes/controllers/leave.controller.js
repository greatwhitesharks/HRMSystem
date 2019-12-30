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
  static async getLeaveInfo(req,res){
    //TODO implement using seesion superviserId
     const  leaveService= new LeaveService(db);
      var supervisorId=2;//for test purpses
      var leaveInfo=await leaveService.getLeaveInfo(supervisorId);
      res.json();
  }
static async getLeaveStatus(req,res){
// TODO implement using seesion employeeRecordId
  const leaveService= new LeaveService(db);
  var employeeRecordId=1; //for test used this.
  var status=await leaveService.getLeaveStatus(employeeRecordId);
  if(status==="accept"){
      res.json({
        "status":"accept"
      });
  }
  if (status==="decline"){
 
      res.json({
        "status":"decline"
      });
    }
  else{
    res.json({
      "status":"pending"
    });
  }
}
}



module.exports = LeaveController;
