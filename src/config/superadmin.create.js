const SuperAdmin = require('../models/user');
exports.createSuperAdmin = () => {

    try {
        SuperAdmin.findOne({role: 'SuperAdmin'}).then(doc => {
            if(doc){
                console.log('SuperAdmin already created ');
            } else {
                let defaultSuperAdmin = new SuperAdmin({
                    firstname: process.env.firstname,
                    lastname: process.env.lastname,
                    email: process.env.email.toLowerCase(), 
                    password: process.env.password,
                    role: process.env.role,
                    phoneNumber: process.env.phoneNumber,
                    imagePath: process.env.imagePath,
                    isActive: true
                });
        
                defaultSuperAdmin.save().then(doc => {
                    console.log('SuperAdmin created successfully ');
                })
            }
        });
        
        
    } catch (error) {

    }
};