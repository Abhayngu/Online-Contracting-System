pragma solidity ^0.8.0;

contract MultiPartyContract {
    
   
    
    struct Party {
        uint256 tokens;
        bool isRegistered;
        bool isAuthorized;
    }
     struct Bid {
        address bidder;
        uint256 amount;
    }
    
    mapping(uint256 => Bid[]) public bids;
    
    mapping(address => Party) public parties;
    
    struct Project {
        uint256 id;
        address owner;
        uint256 reward;
        uint256 startTime;
        uint256 endTime;
        bool completed;
        uint256 PROJECT_DURATION ;
    }
    
    mapping(uint256 => Project) public projects;
    uint256 public numProjects;
    
    event ProjectCreated(uint256 id, address owner, uint256 reward, uint256 startTime, uint256 endTime);
    event ProjectCompleted(uint256 id, address winner);
    event TokensUpdated(address party, uint256 tokens);
    
    modifier onlyRegistered() {
        require(parties[msg.sender].isRegistered, "Party not registered");
        _;
    }
    
    modifier onlyAuthorized() {
        require(parties[msg.sender].isAuthorized, "Party not authorized");
        _;
    }
    
    function registerParty() external {
        require(!parties[msg.sender].isRegistered, "Party already registered");
        parties[msg.sender].isRegistered = true;
        parties[msg.sender].tokens = 1000; // start with 1000 tokens
        emit TokensUpdated(msg.sender, parties[msg.sender].tokens);
    }
    
    function authorizeParty(address party) external onlyAuthorized {
        require(parties[party].isRegistered, "Party not registered");
        parties[party].isAuthorized = true;
    }
    
    function createProject(uint256 id,address owner,uint256 reward,uint256 startTime,uint256 endTime,uint256 PROJECT_DURATION) external onlyAuthorized {
        require(reward > 0, "Reward must be positive");
        require(parties[msg.sender].tokens >= reward, "Not enough tokens");
       // parties[msg.sender].tokens -= reward;
        numProjects++;
        projects[numProjects] = Project(numProjects, msg.sender, reward, block.timestamp, block.timestamp + PROJECT_DURATION, false,PROJECT_DURATION);
        emit ProjectCreated(numProjects, msg.sender, reward, block.timestamp, block.timestamp + PROJECT_DURATION);
    }
    
 function placeBid(uint256 projectId, uint256 amount) public {
        require(amount > 0, "Bid amount must be positive");
        bids[projectId].push(Bid(msg.sender, amount));
        emit BidPlaced(projectId, msg.sender, amount);
    }
    function getWinningBid(uint256 projectId) public view returns (address, uint256) {
        Bid[] memory projectBids = bids[projectId];
        require(projectBids.length > 0, "No bids placed for this project");
        address winningBidder = projectBids[0].bidder;
        uint256 winningAmount = projectBids[0].amount;
        for (uint256 i = 1; i < projectBids.length; i++) {
            if (projectBids[i].amount < winningAmount) {
                winningBidder = projectBids[i].bidder;
                winningAmount = projectBids[i].amount;
            }
        }
        return (winningBidder, winningAmount);
    }
}
