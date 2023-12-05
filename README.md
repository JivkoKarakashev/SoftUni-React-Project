# Auto Occasion Application

## Overview

Welcome to the Auto Occasion Application! This is a Single Page Application (SPA) developed with React.js, designed for viewing and managing car listings.

## Features

 -	Browse Car Ads: Visitors can view a variety of car ads, with the ability to filter listings through additional search fields by make, model, and year.
 -	User Registration: Users can register with a unique email, username and password.
 -	Create Ads: Registered users have the ability to create their own car advertisements.
 -	Decorate Ads: After successfully posting an ad, users have the option to decorate it according to the extras of the car.
 -	Edit and Delete Ads: Ad authors can easily edit or delete their publications before the car was bought.
 -  Buy Ads: Every logged-in user should be able to buy an other listings, but not his own.
 -	Browse your listings: Registered users have a profile page with all their published ads.

## Table of Contents

-   [Overview](#overview)
-   [Features](#features)
-   [Application development description](#application-development-description)
-   [Usage](#usage)

-   [Project Structure](#project-structure)
-   [Running the Application](#running-the-application)
-   [Running tests](#running-tests)
-   [API Endpoints](#api-endpoints)
-   [License](#license)

## Application development description

1. Developed with Visual Studio Code v.1.76.2 + Node.js v.16.14.2.
2. Used libs: React.js v.18.2.0 + Vite v.4.4.5 with HMR, Babel plugin for fast refresh and some ESLint v.8.45.0 rules.
3. Browsers used: Mozilla Firefox and Google Chrome(latest versions)+ Addons: axe DevTools®, React Dev.Tools, Pesticide.

## Usage

1. **Navigation bar:**
   Navigation links change the current page (view). Guests (unauthenticated visitors) see the links to the Home, Search, Catalog pages, as well as the links to the Login and Register pages.
   The logged-in user navbar contains the links to Home, Search, Catalog, Publish, Profile pages and a link for the Logout action.
2. **Login User:**
   The included REST service comes with the following premade user accounts, which you may use for test purposes:
	{ "email": "peter@abv.bg", "username": "Peter", "password": "123456" }
	{ "email": "george@abv.bg", "username": "George", "password": "123456" }
	{ "email": "admin@abv.bg", "username": "Admin", "password": "123456" }
	
	REST Service API Endpoint:
	Request body:{ email, password }
	Method:POST 
	URL:http://localhost:3030/users/login
	The Login page contains a form for existing user authentication. By providing an email and password, the app login user in the system if there are no empty fields.
	Upon success, the REST service returns information about the existing user along with a property accessToken, which contains the session token for the user, in order to be able to perform authenticated requests.
	After successful login, the user is redirected to the Home page. If there is an error, an appropriate error message is displayed.
3.	**Register User:**
	REST Service API Endpoint:
	Request body:{ email, username, password }
	Method:POST 
	URL:http://localhost:3030/users/register
	The Register page contains a form for new user registration. By providing an email, username and password, the app register new user in the system if there are no empty fields.
	Upon success the REST service returns the newly created object with an automatically generated _id and a property accessToken, which contains the session token for the user, in order to be able to perform authenticated requests.
	After successful registration, the user is redirected to the Home page. If there is an error, an appropriate error message is displayed.
4.	**Logout User:**
	The logout action is available only for logged-in users.
	REST Service API Endpoint:
	Request headers:{ 'X-Authorization': 'accessToken' }
	Method:GET 
	URL:http://localhost:3030/users/logout
	After successful logout, the user is redirected to the Login page.
5.	**Home page:**
	All users are welcomed to the Home page, where they can proceed to Catalog or Publish pages.
6.	**Catalog page:**
	This page displays a list of all listings that have not yet been purchased in the system. Clicking on the details button in the cards leads to the details page for the selected listing.
	REST Service API Endpoints:
	Method:GET 
	URL:http://localhost:3030/data/cars - for all listings
	URL:http://localhost:3030/data/bought - for all listings that have been purchased
7.	**Publish page:**
	The Publish page is available to logged-in users. It contains a form for creating new listings. User can publish listing with send request, if there are no empty fields.
	REST Service API Endpoint:
	Method:POST
	Request headers:{ 'X-Authorization': 'accessToken', 'Content-Type': 'application/json' }
	Request body:
	{ 
		make: 'string',
		model: 'string',
		mileage: integer'number',
		fuel: 'string',
		year: 'number',
		location: 'string',
		image: 'string' (URL address),
		price: integer or floating-point 'number',
		description: 'string'
	}
	URL:http://localhost:3030/data/cars
	Upon success, the REST service returns the newly created record.
	After successful creation, the user is redirected to the Details page of currently published item.
8.	**Details page:**
	All users are able to view details about listings. Clicking on the details button in the cards leads to the details page for the selected listing. If the currently logged-in user is the creator of the listing, the Decorate, Edit and Delete buttons are displayed.
	Every logged-in user is able to buy the car from the ad, but not his own. By clicking on the [Buy] button. [Buy] button is displayed only for logged-in users who are not authors for the ad.
	REST Service API Endpoints for Details view:	
	Method:GET 
	URL:http://localhost:3030/data/cars/{:carId} - for selected car ad
	URL:http://localhost:3030/data/equipment - for viewing all extras for this car
	URL:http://localhost:3030/data/bought?where=productId%3D%22${:carId}%22&distinct=_ownerId&count - for checking if the car have been already purchased
	
	REST Service API Endpoints for Buying action:	
	Method:POST 
	Request headers:{ 'X-Authorization': 'accessToken', 'Content-Type': 'application/json' }
	URL:http://localhost:3030/data/bought  - for setting up the car status as Sold
	After successful offer purchasing, the [Buy] button is not available any more and text with "The Car was Sold!" is displayed on its place.
	The ad is removed from the Catalog page and is only visible on the Profile page of the user who created it.