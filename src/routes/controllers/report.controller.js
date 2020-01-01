/* eslint-disable space-before-blocks */
const LeaveService = require('../../services/absence.service');
const db = require('../../db');
const CustomAttributeService =
  require('../../services/customAttribute.service');
const _ = require('lodash');
const moment = require('moment');

const GROUP_BY_MAP = {
  department: 'department_id',
  paygrade: 'paygrade',
  job_title: 'job_title',
  employment_type: 'employment_type',

};
const TITLE_MAP = {
  department: 'd.name',
  paygrade: 'paygrade',
  job_title: 'job_title',
  employment_type: 'employment_type',

};

/**
 *

// Todo: Refactor code into a new service
*/
class LeaveController {
  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static async generateLeaveReport(req, res){
    const ca = new CustomAttributeService(db);
    const customAttributes= (await ca.getAttributes(['name'])).map((x)=>x.name);
    const currentBranch = 1;
    let sql;
    let select;
    let where = 'branch_id = ?';
    const count = 'er.id';
    sql = ` as prop_name, count(${count}) as value FROM employee_record er JOIN department d on er.department_id = d.id JOIN branch b on d.branch_id = b.id`;
    let gby = req.query.groupBy;


    if (Object.keys(GROUP_BY_MAP).includes(gby)) {
      select = TITLE_MAP[gby];
      gby = GROUP_BY_MAP[gby];
      console.log(select);
    } else {
      if (customAttributes.includes(gby)) {
        sql += ` JOIN custom_attribute_value as cav ON cav.employee_record_id = er.id`;
        where += ` AND cav.attribute_name = '${gby}'`;
        gby = 'cav.value';
        select='cav.value';
      } else {
        return res.status(404);
      }
      // custom attributes
    }
    sql = 'SELECT ' + select + sql + ' WHERE ' + where+ ` GROUP BY ${gby}`;
    console.log(sql);
    const result = await db.execute(sql, [currentBranch]);


    const data = result[0];
    const values = data.map((x)=>x['value']);
    const titles = data.map((x)=>`'${x['prop_name']}'`);
    console.log(data);
    res.render('reports/index', {
      layout: 'layouts/main',
      title: 'Reports',
      subtitle: 'Employee Records Grouped By ' +
        _.startCase(_.lowerCase(gby.replace('_', ' '))),
      values,
      titles,
      attributes: [...customAttributes, ...Object.keys(TITLE_MAP)],
      attributeLabels: [
        ...customAttributes.map((e)=> _.startCase(_.lowerCase(e.replace('_', ' ')))),
        ...Object.keys(TITLE_MAP).map((e)=> _.startCase(_.lowerCase(e.replace('_', ' ')))),
      ],
      selected: select,
    });
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static async generateEmployeeReport(req, res){
    const ca = new CustomAttributeService(db);
    const customAttributes= (await ca.getAttributes(['name'])).map((x)=>x.name);
    console.log(customAttributes);

    const currentBranch = 1;
    let sql;
    let select;
    let where = 'branch_id = ?';
    const count = 'a.id';
    // const range =  decodeURI(req.query.range).split('-');
    const range = decodeURI(req.query.range).split(' - ').map((x)=>x.trim()) || [req.query.from, req.query.to];

    const fromDate = moment(range[0]).format('YYYY-MM-DD');
    const toDate = moment(range[1]).format('YYYY-MM-DD');

    sql = ` as prop_name, type, sum(
        ABS(
          TIMESTAMPDIFF(
            DAY,
            GREATEST(
              \`from\`,
              '${fromDate}'
              ),
            LEAST(
              \`to\`,
            '${toDate}'
            )
          )
        )) as value FROM employee_record er JOIN department d on er.department_id = d.id JOIN branch b on d.branch_id = b.id`;
    let gby = req.query.groupBy || 'department';


    sql += ` JOIN absence a on er.id = a.employee_record_id `;

    where += ` AND status='approved' AND a.from <= NOW() AND a.to >= ? AND a.from <= ?`;


    if (Object.keys(GROUP_BY_MAP).includes(gby)) {
      select = TITLE_MAP[gby];
      gby = GROUP_BY_MAP[gby];
      console.log(select);
    } else {
      if (customAttributes.includes(gby)) {
        sql += ` JOIN custom_attribute_value as cav ON cav.employee_record_id = er.id`;
        where += ` AND cav.attribute_name = '${gby}'`;
        gby = 'cav.value';
        select='cav.value';
      } else {
        return res.status(404);
      }
      // custom attributes
    }
    sql = 'SELECT ' + select + sql + ' WHERE ' + where+ ` GROUP BY ${gby}, a.type`;
    console.log(sql);

    const result = await db.execute(sql, [currentBranch, fromDate, toDate]);


    const data = result[0];
    console.log(data);
    const types = {};
    for (const row of data){
      console.log(data);
      types[row.type] = types[row.type] || [];
      types[row.type].push({prop_name: row.prop_name, value: row.value});
    }

    const lTypes = Object.keys(types);

    for (const k of Object.keys(types)){
      types[k] = {
        values: types[k].map((x)=>x['value']),
        titles: types[k].map((x)=>`'${x['prop_name']}'`),
      };
    }


    console.log(types);
    res.render('reports/leaves', {
      layout: 'layouts/main',
      title: 'Reports',
      subtitle: 'Leave Days Grouped By ' +
      _.startCase(_.lowerCase(gby.replace('_', ' '))),
      types,
      attributes: [...customAttributes, ...Object.keys(TITLE_MAP)],
      attributeLabels: [
        ...customAttributes.map((e)=> _.startCase(_.lowerCase(e.replace('_', ' ')))),
        ...Object.keys(TITLE_MAP).map((e)=> _.startCase(_.lowerCase(e.replace('_', ' ')))),
      ],
      selected: select,
      lTypes,
      startCase: _.startCase,
    });
  }
}


module.exports = LeaveController;
