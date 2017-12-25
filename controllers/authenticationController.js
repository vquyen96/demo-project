var Account = require('../models/account');
var Credential = require('../models/credential');
var accountController = require('../controllers/accountController');
require('mongoose-pagination');
var crypto = require('crypto');

exports.checkLogin = function(req, resp){	
	var username = req.body.username;
	var password = req.body.password;
	Account.findOne({ username: username, 'status': 1 },function(err, result){
		if(err){
			console.log(err);
			resp.send('Not okie.');
			return;
		}
		if(result){
			var digestedPassword = accountController.sha512(password, result.salt);
			if(digestedPassword === result.password){
				var credential = new Credential({
					tokenKey: crypto.randomBytes(20).toString('hex'),
					ownerId: result._id					
				});
				credential.save(function(err){
					if(err){
						resp.send(err);
						return;
					}
					resp.send(credential);
					return;
				});					
				return;
			}else{
				resp.send('Password is not match.');
				return;	
			}
		}else{
			resp.send('Not okie.');
		}
	});	
}

exports.delete = function(req, resp){	
	Account.findById(req.params.id,function(err, result){				
		result.status = 0;
		Account.findOneAndUpdate({_id: req.params.id}, result, {new: true}, function(err, result) {
		    resp.json(result);
		});
	});	
}