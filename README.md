# GA-Project-2

## Project Name
Reel Reviews

## Description/ Purpose
I have a massive passion for movies and when I find one that I particularly enjoy I feel like I struggle sometimes to see where I might be able to find a movie similar to it. In response to this I wanted to start a blog type website where users with accounts could create and edit reviews with the content of those reviews including the: title, genre, where it is currently streaming, tags to highlight aspects of the movie, an image (ideally of the cover), the review of the movie and most importantly what movies they feel are similar to the one they are reviewing. Users or visitors of the website can browse the collection of reviews and click on the image associated with each review to view the entire review and see what movies that user posted as beign similar to the one they reviewed.

## User Stories
- AAU- I want to be able to make an account
- AAU- I want to be able to make posts about movies that I have seen to give a review
- AAU- I want to be able to say what movies I feel are similar to the one I am posting about
- AAU- I want to be able to look at the index page and see what movies people are posting about
- AAU- I want to be able to select a specific review to see what movie suggestions they offer
- AAU- I want to be able to edit or delete a review if I am logged in to an account

## Wireframes
https://media.git.generalassemb.ly/user/46658/files/7751aed1-4865-45cd-be40-b9b6ce114f56

## Technologies/ Approach
I utilized node.js, MongoDB, Mongoose 6.10.0, css, ejs, express, express-session, method-override, .env and bcrypt to create the website. It was then depolyed with Heroku. By using MongoDB and mongoose I was able to create a schemas for the reviews as well as the users so that I could then call upon that data into the overall development of the website with ejs. By utilizing node.js with ejs and mongoose I could then create view pages to facilitate the CRUD method of user interface so that users could interact with the website and access information stored within the database. The overall CRUD opertations were facilitated by instituting the seven RESTful routes.<br />
 With the utilization of the bycrypt dependency I was able to also generate routes for visitors of the site to create and log into accounts that then had encrypted passwords stored in the database for safty and retreival.<br />
A .env file was also used to store sensitive information vital to the overall success and operation of the website.

## Installation Instructions
To run this on a local server these dependencies are required:
- Node.js
- Mongoose v. (6.10.0)
  - Connection to MongoDB database
- ejs
- express
- express-session
- bcrypt
- method-override

## Unsolved Problems
I really wanted to add some more specific backend work that would make it so that only the author of the review could edit or delete their review. I also wanted to make it so that when a user is logged in the website will store that session and remember that they are logged in so that you can't log into multiple accounts at once. Along that same note I wanted to add a way for flash messages to populate the screen if the user failed to log in with the correct information.<br />
With all of that, I also wanted to add a little bit more interactivity with the reviews so that users could up-vote or down-vote reviews as well as add comments to the reviews so that more of a community could be formed on the website.

## Forthcoming Features
After looking more into cookies and their funtionality as well as some dependency packages that can help with flash messages I hope to create a more dynamic and interactive website that is similar to what has already been described but with all the unsolved issues also now working as functionality. Reaseach will also go into "one-to many relationships" for the connection between users and their reviews.
