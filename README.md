# Human Resource Managment System Project
![size badge](https://img.shields.io/github/repo-size/greatwhitesharks/HRMSystem)

Human Resource Managment System made for CS 3042 group project

## Running the code

1. Clone this repository
2. run `npm install`
3. rename .env.sample to .env and enter your db info
4. run `npm run nodemon` to start the server 

## Functional Requirements

- [x] HR admin should be able to add employee data to the system
- [ ] Managerial employees should be able to edit personal information
- [ ] Employees should be able to view personal information/leave counts
- [x] Admin(or any suitable role as defined in your SRS) should be able to define new custom employee attributes
- [ ] Employees should be able to apply leave through system
- [x] Supervisors should be able to view leave requests and approve them
- [x] System should update leave counts of each employee when leaves are approved
- [ ] Managerial employees should be able to view leave counts of the employees
- [ ] Admin(or any suitable role as defined in your SRS) should be able to configure leave related properties, add/remove job titles, pay graded etc.
- [x] System should be able to generate the following reports
  - [x] Employee by department
  - [x] Total leaves in given period by department
  - [x] Employee reports grouped by job title, department, pay grade etc.
  - [x] Reports based on custom fields (should contain at least 2 custom fields created beforehand)

## ERD

![ERD](./docs/ERD/ERD.png)

## Technologies

* [Express](https://expressjs.com/) - The web framework used
* [NPM](https://www.npmjs.com/get-npm/) - Package Management
* [MySql](https://www.mysql.com/) - Database System

## Authors
