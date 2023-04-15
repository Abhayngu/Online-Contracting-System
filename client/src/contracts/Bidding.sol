// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Bidding {

    struct Project{
        string projectId;
        address payable owner;
        uint lowestBid;
        address payable lowestBidder;
        bool exists;
        uint endTime;
        bool validated;
        address[] bidAdd;
    }


    event BidderLoges(string indexed project_id,address bidder, uint amount);
    event createParties(address party, string name);
    event deletedParties(address party, string name);
    event createProjects(address,string);

    mapping(string=>mapping(address=>uint)) bids;
    mapping(string => Project) projects;
    mapping(address => bool) permission;
    mapping(string => uint) count_validator;

    function createParty(string memory name) public{
        emit createParties(msg.sender,name);
    }

    function deleteParty(string memory name) public{
        emit deletedParties(msg.sender,name);
    }

    function providePermission(address addr) public{
        permission[addr] = true;
    }

    function revokePermission(address addr) public{
        permission[addr] = false;
    }

    function validateProject(string memory project_id) public{
        Project storage temp = projects[project_id];
        require(temp.exists,"Project doesn't exist");
        require(permission[msg.sender],"You have no permission to validate project");
        count_validator[project_id]++;
        if(count_validator[project_id]>=2){
            temp.validated = true;
            temp.endTime = block.timestamp+temp.endTime;
        } 
    }

    function createProject(string memory project_id , uint _seconds)public {
        Project storage temp = projects[project_id];
        require(!temp.exists,"Project already exist");

        projects[project_id] = Project(
            project_id,
            payable(msg.sender),
            0,
            payable(address(0)),
            true,
            block.timestamp+_seconds,
            false,
            new address[](0)
        );
        emit createProjects(msg.sender, project_id);
    }

    

    function bid(string memory project_id,uint amount) public  {

        Project storage temp = projects[project_id];

        require(temp.exists,"Project Doesn't exist");
        // require(temp.validated,"Project is not validated yet");
        require(temp.endTime>block.timestamp, "Bidding is ended for this project");
        require(!IsOwner(temp.owner), "Project Issuer is not allowed to bid");
        require(amount!=0, "Zero amount is not allowed.");
        require(bids[project_id][msg.sender]==0,"You have already bidded for this project");
      
        if(temp.lowestBid == 0){
            temp.lowestBid = amount;
            temp.lowestBidder = payable(msg.sender);
        }
        else{
            if(amount<temp.lowestBid){
                temp.lowestBidder = payable(msg.sender);
                temp.lowestBid = amount;
            }
        }

        bids[project_id][msg.sender] = amount;
        temp.bidAdd.push(msg.sender);

        emit BidderLoges(project_id , msg.sender , amount);
    }

    function IsOwner(address owner_) private view returns (bool){
        return owner_ == msg.sender;
    }

    function withdraw(address payable bidder_address,uint amount) private {
    
        bidder_address.transfer(amount);
        // bidder_address.send(amount);
    }

    function getLowestBid(string memory project_id) public view returns(uint){
        Project memory temp = projects[project_id];
        require(temp.endTime<block.timestamp, "Bidding is still going on");
        require(IsOwner(temp.owner), "Only the owner can end the auction.");
        require(temp.lowestBid != 0, "There is no bid at the moment.");
        return temp.lowestBid;
    }

    function getLowestBidder(string memory project_id) public view returns(address){
        Project memory temp = projects[project_id];
        require(temp.endTime<block.timestamp, "Bidding is still going on");
        require(IsOwner(temp.owner), "Only the owner can end the auction.");
        require(temp.lowestBid != 0, "There is no bid at the moment.");
        return temp.lowestBidder;
    }

    function endAuction(string memory project_id) public payable{

        Project memory temp = projects[project_id];
        // require(temp.validated,"Project is not validated yet");
        require(temp.exists,"Project Doesn't exist");
        require(temp.endTime<block.timestamp, "Bidding is still going on");
        require(IsOwner(temp.owner), "Only the owner can end the auction.");
        require(temp.lowestBid != 0, "There is no bid at the moment.");

        // temp.owner.transfer(temp.highestBid);
        temp.lowestBidder.transfer(msg.value);

    
    }
}
