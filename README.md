# libTrak
Library Capacity Tracker
====
In this work, we Formalized an Android application to provide available seating space in libraries and friend finding facility by designing a smart algorithm to process data gathered through routers and IR sensors
The four main modules of the project are:
1.	Android Application
2.	Server
3.	Sensors
4.	Router

Technology Details

Server Side:
Technology	NODE JS
Framework 	EXPRESS JS
Programming language 	JavaScript and python 
Data exchange format 	JSON by REST APIs
Encryption used 	Advanced Encryption Standard (AES)
Operating system	Linux Ubuntu
Programming IDE 	Sublime text

Database:
Technology 	MONGO DB – NoSQL	Version : 2.6.5

CLOUD SERVICE
MongoDB-as-service	Host : Mongo Labs	Plan: Sandbox

CLIENT SIDE (APP)

Technology	Android 
Version 	 V 4.0.3+
IDE	Android Studio

HARDWARE SIDE

Sensors	IR-LED, VS1838B TSOP
Micro controllers	Arduino Fio, XBEE-WiFi

Description
Sensor platform:
Hardware components used: Arduino Fio, Xbee, IR LED’s and receivers.
Based on the order in which they are triggered it is determined if the person is entering or leaving and accordingly the count is incremented/decremented.The count is sent every 5 minutes. 

Router:
Assumption: A person in the library has at least one device connected to the internet.
Router contains MAC address/IP address of users.Server connects to the router to obtain information.

Server:
Server interacts with client (app), router and the sensor.
Server code runs on NODE.js using express.js
Server has dedicated methods which accepts the requests and data in the JSON format.
Server is connected to MongoDB which is present in the cloud hosted by Mongo Labs.MongoDB is purely NoSQL DB. 

Video Link: 
https://www.youtube.com/watch?v=hlMtsJnDzVA&feature=youtu.be

