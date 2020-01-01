const AdminService = require('../../services/admin.service');
const db = require('../../db');

class AdminController{
    static async addJobTitle(req,res){
        const adminService = new AdminService(db);
        console.log(req.body);
        
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