---------To Run the Application------------

1. cd to ASSIGNMENT-2
2. npm install
3. node server.js

App will be listening on port 3000

----------To Test The Application------------

Import the Post&Comments.postman_collection.json in postman client.


APIS Exposed :

1. Create a Post.    										 POST http://localhost:3000/posts
2. Get All Posts.   										 GET http://localhost:3000/posts
3. Get Post by postId  										 GET http://localhost:3000/posts/{postId}
4. Update Post by postId  									 PUT http://localhost:3000/posts/{postId}
5. Delete Post by postId   									 DELETE http://localhost:3000/posts/{postId}
6. Adding comments to Post.  								 POST http://localhost:3000/posts/{postId}/comments
7. Get Comments for Post     								 GET http://localhost:3000/posts/{postId}/comments
8. Update Comment for Given post using postId and commentId  PUT http://localhost:3000/posts/{postId}/comments/{commentId}
9. Delete Comment on Given post using postID and CommentId   DELETE http://localhost:3000/posts/{postId}/comments/{commentId}
