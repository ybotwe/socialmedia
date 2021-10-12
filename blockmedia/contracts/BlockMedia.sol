//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract BlockMedia {

    /********************************************************************************************/
    /*                                       DATA VARIABLES                                     */
    /********************************************************************************************/
    string public name;
    uint public totalPosts = 0;
    mapping(uint => Post) public posts;

    /********************************************************************************************/
    /*                                       DATA STRUCTURES                                    */
    /********************************************************************************************/

    struct Post{
        uint id;
        string content;
        uint tipAmount;
        address author;
    }


    /********************************************************************************************/
    /*                      FUNCTION MODIFIERS & CONSTRUCTOR                                    */
    /********************************************************************************************/

    constructor() {
        name = "BlockMedia";
    }

    /********************************************************************************************/
    /*                     EVENTS & CONTRACT FUNCTIONS                                          */
    /********************************************************************************************/

    event PostCreated(uint postId, string postContent, uint tipAmount, address author);
    event PostTipped(uint postId, string postContent, uint tipAmount, address author);

    function createPost(string memory _postContent) public {
        require(bytes(_postContent).length > 0);
        //Increment post count
        totalPosts++;
        //Create post
        posts[totalPosts] = Post(totalPosts, _postContent, 0, msg.sender);
        //Trigger event
        emit PostCreated(totalPosts, _postContent, 0, msg.sender);
    }

    function tipPost(uint _id) payable public {
        require(_id > 0 && _id <= totalPosts);
        //Fetch the post
        Post memory _post = posts[_id];

        //Get author 
        address _author = _post.author;

        //pay author 
        payable(_author).transfer(msg.value);
        //Increment tip amount
        _post.tipAmount = _post.tipAmount + msg.value;
        //Update post
        posts[_id] = _post;
        //Trigerr event
        emit PostTipped(totalPosts, _post.content, _post.tipAmount, _author);
    }

    
}
