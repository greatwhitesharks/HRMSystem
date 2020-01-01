const RoleAndPermissionService = require('../../services/roleAndPermission.service');
const db = require('../../db');

class roleAndPermissionController{

static async create(req,res){
    // const{
    //   role,
    //  permission
    // }=req.body;
    var role='admin2';
    var permission=["entity","action","group"];
    const roleAndPermissionService=new  RoleAndPermissionService(db);
    await roleAndPermissionService.createRole(role,permission);
    
  }
  static async getPermissions(req,res){
    const roleAndPermissionService=new RoleAndPermissionService(db);
    res.json(await roleAndPermissionService.getPermissions());
  }
  
}

module.exports=roleAndPermissionController;

