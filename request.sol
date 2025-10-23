pragma solidity ^0.8.0;

contract PaymentRequest {
    address public owner;
    mapping(address => uint256) public outstandingRequests;

    event PaymentRequested(address indexed requester, uint256 amount);
    event PaymentReceived(address indexed payer, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    // Function to request a payment from a specific address
    function requestPayment(address _requester, uint256 _amount) public {
        require(msg.sender == owner, "Only owner can request payments");
        outstandingRequests[_requester] = _amount;
        emit PaymentRequested(_requester, _amount);
    }

    // Function for a user to pay the requested amount
    function payRequest() public payable {
        require(outstandingRequests[msg.sender] > 0, "No outstanding payment request for this address");
        require(msg.value >= outstandingRequests[msg.sender], "Insufficient funds sent");

        uint256 amountToPay = outstandingRequests[msg.sender];
        outstandingRequests[msg.sender] = 0; // Clear the request
        emit PaymentReceived(msg.sender, amountToPay);

        // Optionally, forward excess funds back to the sender if desired
        if (msg.value > amountToPay) {
            payable(msg.sender).transfer(msg.value - amountToPay);
        }
    }

    // Function to check outstanding request for an address
    function getOutstandingRequest(address _addr) public view returns (uint256) {
        return outstandingRequests[_addr];
    }
}
