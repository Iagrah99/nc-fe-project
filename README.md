# Northcoders News Frontend Project

## Project Summary

Welcome to my Northcoders News Frontend Project! The project was mostly built in React, and uses some React libraries such as React Bootstrap & Styled Components. It also uses some good old vanilla CSS as well! 

The project itself serves as the frontend for my backend restful API project. Users are currently able to browse & filter articles by their topic, sort them by date, comment count and the number of votes they have. They can also order them either by descending (default) or ascending order. Clicking on any article will take the user to the article page itself, where it can be viewed in full. Users may upvote or downvote the article, and are able to post their own comments, and even delete them so long as the comment was made by the user that is currently signed in. Users are also able to sign in as a different user from a pre-defined list of users. 

## Hosted Live Version

This version is hosted using the website hosting service, <a href="https://www.netlify.com/">Netlify</a>.

This version can be found <a href="https://nc-news-uk.netlify.app" target="_blank">here</a>.

## Instructions

If you wish to run a local version of this project on your computer, read the following instructions.

### Minimum Installation Requirements

<ul>
  <li><a href="https://nodejs.org/en" target="_blank">Node.js</a> - Version v21.2.0</li>
</ul>

1. Start by forking the project repository, and open up a terminal. Then do the following steps:

    1A. Clone the repository to your local machine

    ```bash
    git clone https://github.com/Iagrah99/nc-fe-project
    ```

    1B. Change from the current directory into the project folder

    ```bash
    cd nc-fe-project
    ```

    1C. Open up the folder in VS Code

    ```bash
    code .
    ```

2. Now let's verify you have Node installed. Inside VSCode open a terminal window <kbd>CTRL/CMD SHIFT `</kbd>. Then do the following steps:

    2A. Run the check version command for Node
    
    ```
      node --version
    ```
    
    2B.  Once the version is verified, we can install our dependencies by running the following Node Package Manager (NPM) command: 
  
    ```
      npm install
    ```

   2C.  Now the dependencies are installed, we can run the project using the following command:
  
    ```
      npm run dev
    ```
    
Now you should be good to go! 
