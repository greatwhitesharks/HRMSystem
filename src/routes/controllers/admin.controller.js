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

    static updateOrganization(req, res) {
        (async () => {
          const {
            name,
            registration_no,
            root_branch_id,
          } = req.body;
    
        const adminService = new AdminService(db);
        
        const organization = await adminService.updateOrganization(
            name,
            registration_no,
            root_branch_id,
        );
        
        return organization;
        //please check these parts .
        //                       _/|\_
      })()
          .then((organization) => res.json({"name": organization.name}))
          .catch((e)=>res.json({error: e}));
        
      }

      //veiwing organization data

      static viewOrganization(req, res) {
        (async () => {
    
        const adminService = new AdminService(db);
        
        res.jason(await adminService.viewOrganization());
        
        //please check these parts .
        //                       _/|\_
      })()
          .catch((e)=>res.json({error: e}));
        
      }


    static async addPayGrade(req,res){
        const {name,minsalary,maxsalary,branchid} = req.body;
        const adminService = new AdminService(db);
        const sts = await adminService.findPayGrade(name); //checking if the paygrade already exist in the db - return boolean value
        if (sts){//paygrade not in the db
            adminService.addPayGrade (name,minsalary,maxsalary,branchid);
        }else {//paygrade already exist in the db
            res.json({
                "paygrade":"decline" // change this accordingly
              });
            
        }
    }
    static async removePayGrade(req,res){
        const name = req.body;
        const adminService = new AdminService(db);
        const sts = await adminService.findPayGrade(name); //checking if the paygrade already exist in the db - return boolean value
        if (sts){//paygrade already exist in the database logic
            adminService.removePayGrade (name);
        }else {
            res.json({
                "paygrade":"decline"
              });
        }
    }

    static async changeLeaveLimit(req,res){
        const {type,
            paygrade,
            leavecount,
            reset} = req.body;
        const adminService = new AdminService(db);
        await adminService.changeLeaveLimit (type,paygrade,leavecount,reset);
        res.json();
    }
}

module.exports = AdminController;