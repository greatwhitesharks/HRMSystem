const AdminService = require('../../services/admin.service');
const db = require('../../db');

class AdminController{
    static async addJobTitle(req,res){
        const {jobTitle,salary} = req.body;
        const adminService = new AdminService(db);
        const sts = await adminService.findJob(jobTitle); //checking if the job already exist in the db - return boolean value
        if (sts){//job not in the db
            adminService.addJob (jobTitle,salary);
        }else {//job already exist in the db
            res.json({
                "job":"decline" // change this accordingly
              });
            
        }
    }
    static async removeJobTitle(req,res){
        const jobTitle = req.body;
        const adminService = new AdminService(db);
        const sts = await adminService.findJob(jobTitle); //checking if the job already exist in the db - return boolean value
        if (sts){//job already exist in the database logic
            adminService.removeJob (jobTitle);
        }else {
            res.json({
                "job":"decline"
              });
        }
    }
}

module.exports = AdminController;