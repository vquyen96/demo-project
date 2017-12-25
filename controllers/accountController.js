var Account = require('../models/account');
require('mongoose-pagination');
var crypto = require('crypto');

exports.getList = function(req, resp){	

	// Lấy tham số và parse ra number.	
	var page = Number(req.query.page);
	var limit = Number(req.query.limit);

	Account.find({'status': 1})
	.paginate(page, limit, function(err, result, total) {    	
    	var responseData = {
    		'listStudent': result,
    		'totalPage': Math.ceil(total/limit)
    	};
    	resp.send(responseData);
  	});
}

exports.getDetail = function(req, resp){	
	Account.findOne({ _id: req.params.id, 'status': 1 },function(err, result){
		resp.send(result);
	});
}

exports.add = function(req, resp){			
	var obj = new Account(req.body);
	var salt = Math.random().toString(36).substring(7);
	obj.salt = salt;
	obj.password = sha512(obj.password, obj.salt);
	obj.save(function(err){
		if(err){
			resp.send(err);
			return;
		}
		resp.send(obj);
	});	
}

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    return hash.digest('hex');    
};

exports.sha512 = sha512;

exports.update = function(req, resp){
	Account.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, result) {
	    resp.json(result);
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