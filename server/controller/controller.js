var User = require('../model/model');

// create and save new user
exports.create = async (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }
    // new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    // save user in the database
    await user.save();
    return res.redirect('/add-user');

}

// retrieve and return all users/ retrive and return a single user
exports.find = async (req, res) => {

    if (req.query.id) {
        const id = req.query.id;
        const data = await User.findById(id)
        res.send(data)

    } else {
        const user = await User.find()
        res.send(user);

    }


}

// Update a new idetified user by user id
exports.update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    const data = await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
    return res.send(data);
}

// Delete a user with specified user id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    const user = await User.findByIdAndDelete(id);
    if (user) {
        res.send({
            message: "User was deleted successfully!"
        })
    }
    else {
        res.status(500).send({
            message: "Could not delete User with id=" + id
        });
    }
}