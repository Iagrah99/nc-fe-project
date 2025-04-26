# Northcoders News Frontend Project

## Project Summary

Welcome to NC News! The project was built in React and styled using TailwindCSS.

This project was built using React and styled with TailwindCSS.

NC News serves as the frontend for my backend RESTful API project. Users can browse and filter articles by topic, and sort them by date, comment count, or the number of votes. Articles can be ordered in either descending (default) or ascending order.

Clicking on any article takes the user to a full view of the article, where they can upvote or downvote it, post comments, edit or delete their own comments (provided they are the signed-in user), and join discussions.

Users can also switch accounts by signing in as a different predefined user from a preset list.

The project showcases a user-centred design with dynamic, interactive functionality, seamless API integration, and responsive styling for an accessible browsing experience.

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
