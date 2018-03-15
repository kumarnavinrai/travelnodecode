## Overview
NodeJs project’s purpose is to provide the reference code and enable quick and easy start to consuming Sabre Webservices. It focuses on business case usage, so it shows how to chain several REST calls into a workflow, where the subsequent call uses the previous one’s result. Its structure is designed to easily reuse parts of the classes, whole classes, modules or even whole project in client’s applications.

## Configuring the application
The configuration is located in *SACSConfig.js* file. It keeps the properties which are needed to connect and authenticate to the Sabre’s REST webservices. Although the credentials are not encrypted right now to lower the project entry time, it is strongly recommended to use the encryption in production systems and do not keep the credentials in plain text. It contains 2 methods:

## Running the application
In order to run the application, one should download and install NodeJS runtime from http://nodejs.org. After installation, the *npm* and *node* commands should be available from the shell. Enter the project directory and run:

1. *npm install* – installs all the required libraries used in the project (datejs, express, node-rest-client, body-parser)
2. *npm start* – runs the application (i. e. starts the express web server)

Now one can start the workflow by opening http://localhost:1337/form.html in a web browser, filling in the required data to the form and submitting it.
