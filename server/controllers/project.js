const Project = require('../models/Project');

exports.getProjectById = async (req, res, next) => {
    try{
        const project = await Project.findById(req.params.id);
        res.status(200).json({data: project});
    } catch {
        res.status(400).json({ msg: `Project not found with id of ${req.params.id}`});
    }    
};

exports.issueProject =async (req, res, next) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id,
            {isIssued: true},
            {new: true}
        );
        res.status(200).json({msg: 'Project issued successfully.'});
    } catch {
        res.status(400).json({msg: 'Failed to issue Project'});
    }
};


exports.validateProject =async (req, res, next) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id,
            {isValidated: true},
            {new: true}
        );
        res.status(200).json({msg: 'Project validated successfully.'});
    } catch {
        res.status(400).json({msg: 'Failed to validate Project'});
    }
};