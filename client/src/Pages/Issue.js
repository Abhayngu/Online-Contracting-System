import React, { useState, useEffect } from 'react';
import ProjectIssueBox from '../Components/ProjectIssueBox'

export default function Issue(){
    const [projects, setProjects] = useState([{name : 'pro1', tokens : 12, desc : 'sdafdsf'}, 
    {name : 'pro2', tokens : 42, desc : 'sdgsdagasdgsdg'}, 
    {name : 'pro3', tokens: 2, desc : 'asdfkjsafd sd;afkds f'}])
    return <React.Fragment>
        {
            projects.map(project => {return <ProjectIssueBox name={project.name} tokens={project.token} desc={project.desc}/>})
        }
    </React.Fragment>
}