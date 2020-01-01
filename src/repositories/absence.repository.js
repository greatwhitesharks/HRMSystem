const BaseRepository = require('../db/common/baseRepository');

/**
 * Absence Repository
 */
class AbsenceRepository extends BaseRepository {
  /**
   *
   * @param {*} db
   */
  constructor(db) {
    super(db, 'absence');
  }
//new function if want can add to baseRepo or use another func as choise 
/**
   *
   * @param {string} attribute
   * @param {string||int} value
   */
  async getLeaveInfo(employeeRecordId){
     const sql="select `from`,`to`,type,`status`" +`from ${this.table} where employee_record_id=? and `+" `from`>=CURDATE()";
     return await this.db.execute(sql,[employeeRecordId]).then(async (result)=>{
      var leaveInfo=[];
      Object.keys(result[0]).forEach(async (key)=> {
        var entry={};
        entry['from']=result[0][key].from;
        entry['to']=result[0][key].to;
        entry['type']=result[0][key].type;
        entry['status']=result[0][key].status;
        leaveInfo.push(entry);
  }); 
      return leaveInfo;
     });
  }
  async getLeaveInfoAll(supervisorId, status='pending'){
    const sql="select absence.id aid,first_name,middle_name,last_name,`from`,`to`,`comment`,type,job_title " +`from ${this.table} , employee_record where employee_record.id=${this.table}.employee_record_id and supervisor_id=? `+" and `from` >=CURDATE() and status = ?";
    return await this.db.execute(sql,[supervisorId, status]).then(async (result)=>{
     var leaveInfoAll=[];
     Object.keys(result[0]).forEach(async (key)=> {
       var entry={};
       entry['id']=result[0][key].aid;
       entry['fullName']=result[0][key].first_name+ " " +result[0][key].last_name;
       entry['title']=result[0][key].job_title;
       entry['from']=result[0][key].from;
       entry['to']=result[0][key].to;
       entry['type']=result[0][key].type;
       entry['comment']=result[0][key].comment;
       leaveInfoAll.push(entry);
 }); 
  
     return leaveInfoAll;
    });
  }
  async isAvailableLeave(id,type){
    const sql=`select leave_no from taken_leaves where employee_record_id=? and type=?`;
    return await this.db.execute(sql,[id,type]).then(async (result)=>{
      if (result[0][0].leave_no>0){
        return true;
      }
      else{
        return false;
      }
      
    });
  }
  async applyLeave(id,type,from,to,comment){
    const defaultStatus="pending";
    const sql="insert into "+`${this.table}`+"(employee_record_id,`from`,`to`,type,`status`,`comment`) values(?,?,?,?,?,?)";
    try{
    return await this.db.execute(sql,[id,from,to,type,defaultStatus,comment]).then(async(err,result)=>{
        
    });
  }
  catch(e){
    return "err";
  }
  }
}


module.exports = AbsenceRepository;
