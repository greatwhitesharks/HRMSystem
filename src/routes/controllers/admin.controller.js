const AdminService = require('../../services/admin.service');
const db = require('../../db');

class AdminController{
    static async addJobTitle(req,res){
        const {jobTitle,salary} = req.body;
        const adminService = new AdminService(db);
        adminService.addJob (jobTitle,salary);
        res.json();    
    }
    static async removeJobTitle(req,res){
        const jobTitle = req.body;
        const adminService = new AdminService(db);
        adminService.removeJob (jobTitle);
        res.json();
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

      static async viewOrganization(req,res){
        const adminService=new AdminService(db);
        res.json(await adminService.viewOrganization());
      }


    static async addPayGrade(req,res){
        const {name,minsalary,maxsalary,branchid} = req.body;
        const adminService = new AdminService(db);
        adminService.addPayGrade (name,minsalary,maxsalary,branchid);
        res.json();
    }
    static async removePayGrade(req,res){
        const name = req.body;
        const adminService = new AdminService(db);
        adminService.removePayGrade (name);
        res.json();
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