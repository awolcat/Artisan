# Artisan - A gigs platform for tradespeople

![Screenshot from 2023-11-15 20-51-57](https://github.com/awolcat/Artisan/assets/76703071/5b3757b1-70d7-4759-8c64-fe3337405cc4)

In Kenya, Africa, and many parts of the world, skilled tradespeople have few avenues to sell their services. On the other hand, clients have no definitive point of access to a wide variety of skilled trade services. The hiring process can also be cumbersome and inefficient - often involving multiple calls and negotiations.
[Artisan](http://myartisan.works) is a web application that helps tradespeople and technical/menial workers find those in need of their services.


## What really happened?

As an engineer, Albert has always taken pride in his ability to handle minor repairs wherever they may be needed at home. A shot plug here, a stuck drawer there, those are easy fixes, but sometimes you simply need a professional. He found out the hard way when he tried to fix his microwave by replacing a deflector plate only to have the problem return a few days later. His only options at that point were to somehow carry the hefty appliance to a repair shop or find a technician willing to come do the repairs. The second option seemed more appealing, but he soon found out it would not be as easy to find such a service, let alone a reliable one. That’s how the idea behind Artisan came about. Artisan is a platform where technicians with real skills can offer their services “door-to-door” and earn while doing so. It's a win-win situation for both **Albert** and the **contractor** he finds on [Artisan](http://myartisan.works)

## Our Team

* **Habeeb Dindi** [@habeebulla_h](https://x.com/habeebulla_h) - Legend says he has been trying to exit vim since 1998. [Linkedin](https://www.linkedin.com/in/habeeb-dindi-703b03129/)
* **Albert Irura** [@](https://x.com/awol_cat) - Great Software Engineer who brought about the design and the development of the beautiful interface you see when you visit [myartisan.works](http://myartisan.works). [Linkedin](https://linkedin.com/in/albertmathenge)

## Installation 

### This is for developers. You don't need this if you aren't a developer - explore using live site or skip

* Install puppet by running the script in the automations directory: ```./automations/1-install_puppet.sh```
* [OPTIONAL] Install some packages: ```sudo puppet apply ./automations/2-install_packages```
* Create a virtual environment by applying this puppet manifest: ```sudo puppet apply ./automations/5-config_python_env.pp```
* If you don't have mysql installed, install it by applying this manifest: ```sudo puppet apply ./automations/1-install_packages.pp```
* Login to mysql server, ```sudo mysql``` and run these statements:
```
mysql> CREATE TABLE artisan_db;
mysql> CREATE USER 'artisan_db_dev'@'localhost' IDENTIFIED WITH mysql_native_password BY 'artisan_db_pwd';
mysql> GRANT ALL PRIVILEGES ON artisan_db.* TO 'artisan_db_dev'@'localhost' WITH GRANT OPTION;
mysql> exit;
```
* Activate the virtualenv: ```source venv-artisan/bin/activate```
* Apply the latest migration script to initialise the database with the right structure: ```flask db upgrade```
* To populate the database with some fake data, run the flask shell: ```flask shell```
* You should now be in an intractive shell session
* Run the command to populate the database: ```populate_db()``` </br></br>
![Screenshot from 2023-11-16 01-01-04](https://github.com/awolcat/Artisan/assets/76703071/9af969b1-aa77-4813-a1c1-3ccc9fe7b658)

* Exit from the flask shell by pressing ```CTRL+D```
* ```cd``` into the react-artisan directory and install using: ```npm install```
* Open two terminal windows
* On the first window, start the flask app: ```flask run```
* On the second window start the react app: ```npm start```
* Visit http://localhost:3000 for the frontend and http://localhost:5000/api/v1/desired_resource for the api. Check out the API documentation below. 


## How it works

1. Visit [myartisan.works](http://myartisan.works) and make a selection</br></br>
![Screenshot from 2023-11-15 20-51-57](https://github.com/awolcat/Artisan/assets/76703071/5b3757b1-70d7-4759-8c64-fe3337405cc4)

2. You can see a list contractors and the services they offer</br></br>
![Screenshot from 2023-11-18 19-39-25](https://github.com/awolcat/Artisan/assets/76703071/d53d2e31-13e1-41fc-8296-7a6ddb4e31c3)

3. Book your desired contractor for their service</br></br>
![Screenshot from 2023-11-18 19-43-47](https://github.com/awolcat/Artisan/assets/76703071/cfbfab9e-a65e-434c-afba-f7df7bef2fe6)

4. Clients can also make custom job postings</br></br>
![Screenshot from 2023-11-18 19-40-29](https://github.com/awolcat/Artisan/assets/76703071/75178dc9-890b-4bee-ab0b-73a069e93629)
![Screenshot from 2023-11-18 19-40-55](https://github.com/awolcat/Artisan/assets/76703071/efa44ed6-10a7-4d33-a892-bb00aa1cc4d1)

6. Checkout the [site](http://myartisan.works) for more features artisan has to offer.

## API

### contractors
* /api/v1/contractors

    `GET`: Retrieve a list of contractors. Requests can be filtered to match a criteria (e.g., skills, location, availability).

    `POST`: Allow contractors to create and submit their profiles with relevant information, including skills, experience, and contact details.

* /api/v1/contractors/&lt;id&gt;

    `GET`: Retrieve the details of a specific contractor by their id.

    `PUT`: Allow contractors to update their profiles with relevant information, including skills, experience, and contact details.

    `DELETE`: Allows a contractor to delete his/her profile

### contracts

* /api/v1/contracts

    `GET`: Retrieve a list of available contracts or jobs based on various filters like location, job type, and budget.

    `POST`: Enable clients (those offering jobs) to post new job listings with details such as job title, description, required skills, budget, and timeline.

* /api/v1/contracts/&lt;id&gt;

    `GET`: Fetch the details of a specific contract by its unique identifier (e.g., contract ID).

    `PUT`: Allow clients to update the details of their existing job listings.

    `DELETE`: Allow clients to delete their contracts by the contract ID.

### users

* /api/v1/users

    `GET`: Retrieve a list of users. Requests can be filtered to match a criteria (eg location).

    `POST`: Allow users to create and submit their profiles with relevant information..

* /api/v1/users/&lt;id&gt;

    `GET`: Retrieve the details of a specific user by their id.

    `PUT`: Allow users to update their profiles with relevant information..

    `DELETE`: Allows a user to delete his/her profile.

### bookings

* /api/v1/bookings

    `GET`: Retrieve a list of bookings. Requests can be filtered to match a criteria (eg based on a user or contractor).

    `POST`: Allow users or contractors to create a booking when a service or contract is accepted by either party.

* /api/v1/bookings/&lt;id&gt;

    `GET`: Retrieve the details of a specific booking by id.

    `PUT`: Allow users or contractors to update the status of a booking. 

    `DELETE`: Allows a user or a contractor to delete his/her booking.

### services

* /api/v1/services:

    `GET`: Retrieve a list of available services based on various filters like location and price.

    `POST`: Enable contractors (those taking on jobs) to post new services.

* /api/v1/services/&lt;id&gt;

    `GET`: Fetch the details of a specific service by its unique identifier (e.g., service ID).

    `PUT`: Allow contractors to update the details of their existing service.

    `DELETE`: Allow contractors to delete their service offers by the service offer ID.

### service offers

* /api/v1/service_offers

    `GET`: Retrieve a list of available service offers based on various filters like location and price.

    `POST`: Enable contractors (those taking on jobs) to post new offer listings with details such as job title, description, price, and timeline.

* /api/v1/service_offers/&lt;id&gt;

    `GET`: Fetch the details of a specific service offer by its unique identifier (e.g., service offer ID).

    `PUT`: Allow contractors to update the details of their existing offer listings.

    `DELETE`: Allow contractors to delete their service offers by the service offer ID.

### user reviews

* /api/v1/user_reviews

    `GET`: Retrieve a list of available user reviews based on contractors, contracts, etc.

    `POST`: Enable users to post new reviews on their bookings.

* /api/v1/user_reviews/&lt;id&gt;

    `GET`: Fetch the details of a specific user review by its unique identifier (e.g., review ID).

    `PUT`: Allow users to update the details of their existing review.

    `DELETE`: Allow users to delete their user reviews by the user review ID.

## What's Next?

A lot actually, there are so many more feautures we'd like to add to this project, like payment integration, other forms of authentication and so on. 
As it stands there are also a lot of areas that need fixing in production, for example nginx is blocking some internal API calls from the react-app. Feel free to make a pull request if you find anything amiss in the nginx configuration file. We'll keep on iterating and releasing new features as time goes on.

## Technologies we used

* [Bash](https://en.wikipedia.org/wiki/Shell_script) - Automation and Configration Management
* [Puppet](puppet.com/docs/puppet/5.5/) - Automation and Configration Management
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - The Frontend Language
* [React](https://reactjs.org) - Javascript Library
* [Python](http://www.python.org) - The Backend Language
* [Flask](http://flask.pocoo.org/docs/1.0/) - The Backend Framework
* [SQLAlchemy](https://www.sqlalchemy.org/) - Python SQL Toolkit and Object Relational Mapper
* [MySQL](https://mysql.com) - Relational Database Management System
* [Nginx](https://nginx.com) - Server used for deployment


## Related Projects
* [AirBnB Clone](https://github.com/awolcat/AirBnB_clone_v4): a simple web app made in Python, Flask, and JQuery.

* [higher level programming](https://github.com/habeebdindi/alx-higher_level_programming): a repository that demonstrate a large set of python programs I have written.


## LICENSE

MIT LICENSE
