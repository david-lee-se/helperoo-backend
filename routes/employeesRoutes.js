const router = require('express').Router();
const employeeController = require('../controllers/employeesController');

router
    .route('/')
    .get(employeeController.index)
    .post(employeeController.addEmployee);
          
router
    .route('/browse')
    .get(employeeController.getEmployees)

router 
    .route('/search')
    .get(employeeController.getEmployeeBySearch)
router  
    .route('/:id')
    .get(employeeController.singleEmployee)
    .delete(employeeController.deleteEmployee)
    .put(employeeController.editEmployee);


module.exports = router;