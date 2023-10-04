const knex=require('knex')(require('../knexfile'));

exports.index = (req, res) => {
    let queryArray = ['id'];
    req.query.option1? queryArray.push(req.query.option1):'';
    req.query.option2? queryArray.push(req.query.option2): '';
    req.query.option3? queryArray.push(req.query.option3): '';
    req.query.option4? queryArray.push(req.query.option4): '';
    req.query.option5? queryArray.push(req.query.option5): '';
    req.query.option6? queryArray.push(req.query.option6): '';
    
    knex.column(queryArray)
        .select()
        .from('employees')
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).send(`request not fulfilled: ${err}`);
        })
}

exports.getEmployeeBySearch = (req, res) => {

    console.log(req.query.searchTerm)
    knex('employees')
        .select()
        .where(`${req.query.category}`, 'like', `%${req.query.searchTerm}%`)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(400).send(`Request not fulfilled: ${err}`)
        })
}
exports.getEmployees = (_req, res) => {
    
    knex.column('id', 'first_name', 'last_name')
        .select()
        .from('employees')
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(400).send(`Request not fulfilled: ${err}`);
        })
}
exports.addEmployee = (req, res) => {
    if(!req.body.first_name || !req.body.last_name || !req.body.hire_date || !req.body.date_of_birth || !req.body.phone || !req.body.email) {
        return res.status(400).send('All fields are required!')
    }

    knex('employees')
        .insert(req.body)
        .then((response) => {
            const newEmployee = `/employees/${response[0]}`
            res.status(201).location(newEmployee).send(newEmployee);
        })
        .catch((err) => res.status(400).send(`Failed creating employee: ${err}`))
}

exports.deleteEmployee = (req, res) => {
    knex('employees')
        .delete()
        .where({id: req.params.id})
        .then(() => {
            res.status(200).send(`Employee has been deleted.`)
        })
        .catch((err) => {
            res.status(400).send(`Error deleting employee ${err}.`)
        })
}

exports.singleEmployee = (req, res) => {
    knex('employees')
        .where({id: req.params.id})
        .first()
        .then((data) => {
            if(!data) {
                return res.status(404).json({message: `Employee with id:${req.params.id} not found.`})
            }
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).send(`Error getting employee details.`)
        })
}

exports.editEmployee = (req, res) => {

    const updatedEmployee= {...req.body};

    knex('employees')
        .where({id: req.params.id})
        .update(updatedEmployee)
        .then(() => {
            return knex('employees').where({id: req.params.id});
        })
        .then((data) => {
            res.status(200).json(data[0])
        })
        .catch((err) => {
            res.status(400).send('Error editing employee.')
        })
}