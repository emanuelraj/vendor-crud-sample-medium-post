'use strict';

const jwt = require('jsonwebtoken');
const config = require('../../config/environment');
const User = require('../users/users.model');
const bcrypt = require('bcryptjs');


module.exports = {
    login: (req, res) => {
        User.findOne({username : req.body.username},function(err, user){
            if(err){
                return res.status(401).json({message : err});
            }
    
            var isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    
            if(!isPasswordValid){
                return res.status(401).json({auth : false, token : null, message : "Not Authorised User"});
            }else{
    
                let payload = {
                    user_id : user._id,
                    username : user.username
                }
    
                console.log(config.secrets.session);
                let token = jwt.sign(payload, config.secrets.session,{
                    expiresIn : config.secrets.expiresIn
                });
                
                return res.status(200).json({auth : true, token : token, message : "User Logged In Successfully"});
            }
        });
    
    }
}