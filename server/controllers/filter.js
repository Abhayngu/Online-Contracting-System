const Project = require('../models/Project');

exports.getTop3Projects = async (req, res, next) => {
    const projects = await Project.find().sort({ finalBidPrice: -1 }).limit(3);
    res.status(200).json({data: projects});
};

exports.getAllProjects = async ( req, res, next) => {
    const projects = await Project.find();
    res.status(200).json({data: projects});
};

exports.getProjectsByEmail = async (req, res, next) => {
    try {
        const projects = await Project.find({ email: req.params.email});
        if(!projects) {
            return res.status(404).json({ msg: 'No projects found for this email'});
        }
        res.status(200).json({data: projects});
    } catch (err) {
        res.status(400).json({ msg: 'Server error'});
    }
};
