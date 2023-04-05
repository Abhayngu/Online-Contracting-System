const Project = require('../models/Project');

exports.filterProject = async (req, res, next) => {
    // const projects = await Project.find({ isValidated : false});
    // res.status(200).json({data: projects});

    let { isValidated, isIssued, milestonesAchieved} = req.body;
    const condition = {};
    let query;
    if( isValidated) {
        condition['isvalidated'] = isValidated;
    }
    if( isIssued) {
        condition['isIssued'] = isIssued;
    }
    if( milestonesAchieved) {
        condition['type.milestonesAchieved'] = milestonesAchieved;
    }
    query = Project.find(condition);
    let total = await query;
    total = total.length;

    if(!page) {
        page = 1;
    }
    const limit = 2;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    query = query.skip(startIndex).limit(limit);
    const projects = await query;
    const totalPages = Math.ceil(total / limit);
	const pagination = {};

	if (endIndex < total) {
		pagination.next = {
			page: page + 1,
		};
	}
	if (startIndex > 0) {
		pagination.prev = {
			page: page - 1,
		};
	}
    res.status(200).json({data: projects, totalPages, pagination});
};