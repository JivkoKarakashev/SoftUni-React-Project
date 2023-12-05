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
TO DO...

## Application development description

1. Developed with Visual Studio Code v.1.76.2 + Node.js v.16.14.2.
2. Used libs: React.js v.18.2.0 + Vite v.4.4.5 with HMR, Babel plugin for fast refresh and some ESLint v.8.45.0 rules.
3. Browsers used: Mozilla Firefox and Google Chrome(latest versions)+ Addons: axe DevTools®, React Dev.Tools, Pesticide.
4. [POST IMAGE](https://postimg.cc/) cloud API is used for storing the static files like icons and images.

## Usage

1. **Navigation bar:**
   Navigation links change the current page (view). Guests (unauthenticated visitors) see the links to the Home, Search, Catalog pages, as well as the links to the Login and Register pages.
   The logged-in user navbar contains the links to Home, Search, Catalog, Publish, Profile pages and a link for the Logout action.

2. **Login User:**
    The Login page is available only for guests (unauthenticated visitors).

    The included REST service comes with the following premade user accounts, which you may use for test purposes:
    ```json
	{ "email": "peter@abv.bg", "username": "Peter", "password": "123456" }
	{ "email": "george@abv.bg", "username": "George", "password": "123456" }
	{ "email": "admin@abv.bg", "username": "Admin", "password": "123456" }
    ```
	
	**REST Service API Endpoint:**
	-   _Method: POST_
	-   _Request body:_
    ```json
    { 
        "email": "string",
        "password": "string"
    }
    ```
	-   _URL: http://localhost:3030/users/login_

	The Login page contains a form for existing user authentication. By providing an email and password, the app login user in the system if there are no empty fields.
	Upon success, the REST service returns information about the existing user along with a property accessToken, which contains the session token for the user, in order to be able to perform authenticated requests.
	After successful login, the user is redirected to the Home page. If there is an error, an appropriate error message is displayed.

3.	**Register User:**
    The Register page is available only for guests (unauthenticated visitors).

	**REST Service API Endpoint:**
	-   _Method: POST_
	-   _Request body:_
    ```json
        { 
            "email": "string",
            "username": "string",
            "password": "string"
        }
    ```
	-   _URL: http://localhost:3030/users/register_

	The Register page contains a form for new user registration. By providing an email, username and password, the app register new user in the system if there are no empty fields.
	Upon success the REST service returns the newly created object with an automatically generated _id and a property accessToken, which contains the session token for the user, in order to be able to perform authenticated requests.
	After successful registration, the user is redirected to the Home page. If there is an error, an appropriate error message is displayed.

4.	**Logout User:**
	The logout action is available only for logged-in users.
	
    **REST Service API Endpoint:**
	-   _Method: GET_ 
	-   _Request headers:_
    ```json
        { 
            "X-Authorization": "accessToken" 
        }
    ```
	-   _URL: http://localhost:3030/users/logout_

	After successful logout, the user is redirected to the Login page.

5.	**Home page:**
	All users are welcomed to the Home page, where they can proceed to Catalog or Publish pages.

6.	**Catalog page:**
	This page displays a list of all listings that have not yet been purchased in the system. Clicking on the [Details] button in the cards leads to the details page for the selected listing.
	If the Catalog is empty, "Nothing has been published yet. Be the first!" is displayed along with a [Publish-Ad] button that redirects the user to the Publish page.

	**REST Service API Endpoints:**
	-   _Method: GET_ 
	-   _URL: http://localhost:3030/data/cars - for all listings_
	-   _URL: http://localhost:3030/data/bought - for all listings that have been purchased_

7.	**Publish page:**
	The Publish page is available to logged-in users. It contains a form for creating new listings. User can publish listing with send request, if there are no empty fields.
	
	**REST Service API Endpoint:**
	-   _Method: POST_
	-   _Request headers:_
	```json
		{
			"X-Authorization": "accessToken",
			"Content-Type": "application/json"
		}
    ```
	-   _Request body:_
	```json	
		{ 
			"make": "string",
			"model": "string",
			"mileage": "integer number",
			"fuel": "string",
			"year": "integer number",
			"location": "string",
			"image": "string (URL address)",
			"price": "integer or floating-point number",
			"description": "string"
		}	
    ```
	-   _URL: http://localhost:3030/data/cars_
	
	Upon success, the REST service returns the newly created item.
	After successful creation, the user is redirected to the Details page of currently published item.

8.	**Details page:**
	All users are able to view details about listings. Clicking on the [Details] button in the cards leads to the details page for the selected listing. If the currently logged-in user is the creator of the listing, the [Decorate], [Edit] and [Delete] buttons are displayed.
	Every logged-in user is able to buy the car from the ad, but not his own. By clicking on the [Buy] button. [Buy] button is displayed only for logged-in users who are not authors for the ad.
	
    **REST Service API Endpoints for Details view:**
	-   _Method: GET_
	-   _URL: http://localhost:3030/data/cars/{:carId} - for selected car ad_
	-   _URL:http://localhost:3030/data/equipment - for viewing all equipment for this car_
	-   _URL:http://localhost:3030/data/bought?where=productId%3D%22${:carId}%22&distinct=_ownerId&count - for checking if the car have been already purchased_
	
	**REST Service API Endpoint for Buying action:**
	-   _Method: POST_
	-   _Request headers:_
    ```json
        {
            "X-Authorization": "accessToken",
            "Content-Type": "application/json"
        }
    ```
	-   _URL: http://localhost:3030/data/bought  - for setting up the car status as Sold_

	After successful offer purchasing, the [Buy] button is not available any more and text with "The Car was Sold!" is displayed on its place.
	The ad is removed from the Catalog page and is only visible on the Profile page of the user who created it.

9.  **Decorate Listing**
    The Decorate page is available only to logged-in user who is at the same time and author of the listing. Clicking on the [Decorate] button of a particular offer on the Details page, redirects the user to the Decorate page. It contains checkboxes with options that allows author of the ad to decorate the selected car according to the extra equipment come with.
    To confirm decoration, author have to send request by clicking on [Confirm-Equipment] button.
    The author can reject the equipment changes made by pressing the [Back-to-Details] button and return back to the Details page of the current listing.

    **REST Service API Endpoints for equipment view of selected car:**
	-   _Method: GET_
	-   _Request headers:_
	```json
		{
			"X-Authorization": "accessToken"
		}
    ```
	-   _URL: http://localhost:3030/data/cars/{carId}  - for selected car ad_
	-   _URL: http://localhost:3030/data/equipment - for viewing all available equipment to choose from_

    **REST Service API Endpoints for Equipment confirmation action:**
	-   _Method: PUT_
	-   _Request headers:_
    ```json
        {
            "X-Authorization": "accessToken",
            "Content-Type": "application/json"
        }
    ```
	-   _URL: http://localhost:3030/data/cars/{:carId}_

    Upon success, the REST service returns the modified item.
    After successful equipment confirmation request, the user is redirected to the Details page of the currently decorated item.

10. **Edit Listing**
    The Edit page is available only to logged-in user who is at the same time and author of the listing. Clicking on the [Edit] button of a particular offer on the Details page, redirects user to the Edit page with all fields filled with the data for the offer. It contains a form with input fields for all relevant properties. The Author of the offer is able to update it by sending the correct filled form with no empty fields in it before the request making.

    **REST Service API Endpoint:**
	-   _Method: PUT_
	-   _Request headers:_
	```json
		{
			"X-Authorization": "accessToken",
			"Content-Type": "application/json"
		}
    ```
	-   _Request body:_
	```json	
		{ 
			"make": "string",
			"model": "string",
			"mileage": "integer number",
			"fuel": "string",
			"year": "integer number",
			"location": "string",
			"image": "string (URL address)",
			"price": "integer or floating-point number",
			"description": "string"
		}	
    ```
	-   _URL: http://localhost:3030/data/cars/{:carId}_

    Upon success, the REST service returns the modified item.
    After successful edit request, the user is redirected to the Details page of the currently edited item.

11. **Delete Listing**
    The delete action is available to logged-in user, who is at the same time and author of the listing. When the author clicks on the [Delete] button of a particular offer on the Details page, a confirmation dialog is displayed, and upon confirming the dialog, the listing is deleted from the system.

    **REST Service API Endpoint:**
	-   _Method: DELETE_
	-   _Request headers:_
    ```json
        {
            "X-Authorization": "accessToken",
            "Content-Type": "application/json"
        }
    ```
	-   _URL: http://localhost:3030/data/cars/${:carId}_
    Upon success, the REST service returns Object, containing the time of deletion of selected item.
    After successful delete request, the user is redirected to the Catalog page.

12.	**Profile page:**
	The Profile page is available only to logged-in users.
	This page displays a list of all listings made by the current user. If there are no published ads yet, "This user has no published Ad yet!" is displayed.

	**REST Service API Endpoint:**
	-   _Method: GET_
	-   _Request headers:_
	```json
		{
			"X-Authorization": "accessToken"
		}
    ```
	-   _URL: http://localhost:3030/data/cars?where=_ownerId%3D%22{:userId}%22_

13.	**Search page:**
	The Search page is available to all users, both logged-in users and guests (unauthenticated visitors).
	This page allows users to filter listings by their make, model and year. It contains a search form with input fields and, upon submitting a query, a list of all matching listings is displayed. If there are no results, "No Results!" is displayed.

	**REST Service API Endpoint:**
	-   _Method: GET_
	-   _URL: http://localhost:3030/data/cars?where=year>%3D{:yearFromQuery} AND year<%3D{:yearToQuery} AND make%20LIKE%20%22{:makeQuery}%22 AND model%20LIKE%20%22{:modelQuery}%22_

## Project Structure

	-   **`/client`**: Contains the SPA.
    	-   `/public`: Static assets, icons, images and base style css files.
    	-   `/src`: React components, style css, and business logic, contexts, guards and requester services.
			-	``/components``: React components, style css, and business logic.
    		-   ``/guards``: React AuthGuard and OwnerGuard components that check the authentication and authorization of the current user.
    		-   ``/contexts``: React AuthContext and OwnerContext components that share authentication and authorization states between components.
			-	``/services``: JS logic with requester functions for the REST API Service.

	-   **`/server`**: Contains REST API Service with data folder. In this folder are stored .json files with premade data.
