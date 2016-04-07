# General
## Overview
The Sabre API Code Samples for NodeJs project’s purpose is to provide the reference code and enable quick and easy start to consuming Sabre Webservices. It focuses on business case usage, so it shows how to chain several REST calls into a workflow, where the subsequent call uses the previous one’s result. Its structure is designed to easily reuse parts of the classes, whole classes, modules or even whole project in client’s applications.

## Configuring the application
The configuration is located in *SACSConfig.js* file. It keeps the properties which are needed to connect and authenticate to the Sabre’s REST webservices. Although the credentials are not encrypted right now to lower the project entry time, it is strongly recommended to use the encryption in production systems and do not keep the credentials in plain text. It contains 2 methods:

- *encrypt* – it’s purpose is to properly prepare correct values for the configuration. It should be used to encode the credentials obtained from Sabre. After filling proper values, this method should be deleted.
- *decrypt* – the method for decrypting encrypted configuration properties.

Please register at https://developer.sabre.com contact Sabre in order to obtain your own credentials.

## Running the application
In order to run the application, one should download and install NodeJS runtime from http://nodejs.org. After installation, the *npm* and *node* commands should be available from the shell. Enter the project directory and run:

1. *npm install* – installs all the required libraries used in the project (datejs, express, node-rest-client, body-parser)
2. *npm start* – runs the application (i. e. starts the express web server)

Now one can start the workflow by opening http://localhost:1337/form.html in a web browser, filling in the required data to the form and submitting it.

## Quickstart "How to"
In case of Node.JS, the workflow’s activities are implemented as functions, which are bound as event handlers in event emitter. Each function ends with the REST call, invoking get or post method. Those methods require three parameters: request object, response object and event emitter.
- Request object consists of four properties:
	- *event* – the name of the event, that this activity handles – used as a key in the responses object.
	- *nextEvent* – the name of the next event to be run.
	- *service* – path to the service to be called with a REST request.
	- *query* – data to be sent to the service.
	- *directUrl* – a URL, which already contain all the prepared data, like in case of the InstaFlight call, where the URL from the result of LeadPriceCalendar call is being used. If this one is present, the service and query are not required.
- Response – a container used for holding the responses. The REST module’s functionality inserts all the results to this object, in this form: *{"event-name" : result}*. The result is usually an object too.
- Event emitter – an emitter in which all the activities are registered.

# Modules
## Configuration
This module provides configuration of REST webservice calls. It contains the endpoint address and credentials to connect there, which are encrypted. The encryption and decryption methods are included.

## Rest
A module containing methods to connect to Sabre’s REST webservices. It uses the Auth module to obtain the authentication token. There are two methods used there are described in the Quickstart section of this document.

## Auth
Module used for authentication and holding the token obtained from Sabre Webservices. On every REST call, it checks whether the token is present and not expired and then adds the *Authorization* header to the call.

## Main
This is the main file that should be run with NodeJS. It creates activities and starts the express server. The server  

# Support

- [Stack Overflow](http://stackoverflow.com/questions/tagged/sabre "Stack Overflow")
- Need to report an issue/improvement? Use the built-in [issues] (https://github.com/SabreDevStudio/SACS-NodeJs/issues) section
- [Sabre Dev Studio](https://developer.sabre.com/)

# Disclaimer of Warranty and Limitation of Liability
This software and any compiled programs created using this software are furnished “as is” without warranty of any kind, including but not limited to the implied warranties of merchantability and fitness for a particular purpose. No oral or written information or advice given by Sabre, its agents or employees shall create a warranty or in any way increase the scope of this warranty, and you may not rely on any such information or advice. Sabre does not warrant, guarantee, or make any representations regarding the use, or the results of the use, of this software, compiled programs created using this software, or written materials in terms of correctness, accuracy, reliability, currentness, or otherwise. The entire risk as to the results and performance of this software and any compiled applications created using this software is assumed by you. Neither Sabre nor anyone else who has been involved in the creation, production or delivery of this software shall be liable for any direct, indirect, consequential, or incidental damages (including damages for loss of business profits, business interruption, loss of business information, and the like) arising out of the use of or inability to use such product even if Sabre has been advised of the possibility of such damages.
