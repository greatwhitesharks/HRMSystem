const AdminService = require('../../services/admin.service');
const db = require('../../db');

class AdminController{
    static async addJobTitle(req,res){
        const adminService = new AdminService(db);
        await adminService.addJobTitle(
            req.body.jobTitle,
            req.body.jobSalary,
        );
        req.flash('sucess','Job Title Created Successfully')
        res.redirect('/job/add');   
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
        const adminService = new AdminService(db);
        await adminService.addPayGrade(
            req.body.payGradeName,
            req.body.minSalary,
            req.body.maxSalary,
            req.branchId || 0,
        );
        req.flash('sucess','Pay Grade Created Successfully')
        res.redirect('/paygrade/add');   
    }
    static async removePayGrade(req,res){
        const name = req.body;
        const adminService = new AdminService(db);
        adminService.removePayGrade (name);
        res.json();
    }

    static async changeLeaveLimit(req,res){
        const adminService = new AdminService(db);
        await adminService.changeLeaveLimit (
            req.body.paygradeType,
            req.body.payGradeName,
            req.body.leaveCount,
            req.body.paygradeReset,
        );
        req.flash('sucess','Pay Grade Leave Limit Changed Successfully')
        res.redirect('/paygrade/leavechange');  
    }
    static async assignRole(req,res){
        const adminService = new AdminService(db);
        const {id,
            role
            } = req.body;
            await adminService.assignRole(id,role);
      }
    static async deleteAssignedRole(req,res){
        const adminService=new AdminService(db);
        const {id,
            role
            } = req.body;
            await adminService.deleteAssignedRole(id,role);
    }  
}

module.exports = AdminController;