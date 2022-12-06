# Backend README

# Development Specifications

## Backend

### Relational Diagram

<img src="../../assets/Relational_Diagram.png"/>


### API Endpoints

```
/login [POST]
Request:
{
    email : string,
    password: string
}
Response:
{
    status: boolean,

    if status is True:
        data:{
            email: string,
            user_id: number,
            display_name: string
            type: string (Professor / Student)
        }
    else:
        data: string (containing an error message)
}

```

---

```
/register [POST]
Request:
{
    email : string,
    password: string,
    display_name: string,
    type: string (Professor / Student),
    phone: string,
    if type == "Student":
        gpa: float,
        major: string,
        minor: string,
        degree: string,
        year: string
    elif type == "Professor":
        department: string,
        designation
}
Response:
{
    status: boolean
    if status is True:
        data:{
            email: string,
            user_id: number,
            display_name: string
            type: string (Professor / Student)
        }
    else:
        data: string (containing an error message)
}

```

---

```

/get_all_users [GET]
Request: N/A
Response:
{
    status: boolean,

    if status is True:
        data:{
            email: string,
            user_id: number,
			phone: number,
            display_name: string
            type: string (Professor / Student)
        }
    else:
        data: string (containing an error message)
}

```

---

```
/get_all_applications_by_student [POST]
Request:
{
    email : string,
    password: string
}
Response:
{
	status: boolean,

	if status is True:
		data:
		[
			{
				application_id: number,
				posting_id: number,
				title: string,
				description: string,
				location: string,
				prerequisites: string,
				created_at: string, (of the application, NOT the posting)
				updated_at: string, (of the application, NOT the posting)
				professor_user_id: number,
				professor_email: string,
				professor_department: string,
				professor_designation: string
				professor_display_name: string,
				student_user_id: number,
				student_display_name: string,
				student_email: string,
				student_phone: string,
				student_gpa: float,
				student_major: string,
				student_minor: string,
				student_year: string,
				status: string // This is the status of the application and NOT the response.
				remarks: string
			}
		]
	else:
	data: string (error message)
}

```

---

```

/get_specific_application [POST]

Request:
{
	application_id: number,
}
Response:
{

	status: boolean
	data: {
		student: number,
		remarks: string,
		posting_id: number,
		status: string (By default it will be Pending)
		created_at: string,
		updated_at: string

}

```

---

```
/get_all_postings_by_professor [POST]
Request:
{

    student: number (user id of student),

}
Response:
{
    status: boolean
    data:
	{
		posting_id: number,
		title: string,
		professor: number (user id of professor)
		description: string,
    	location: string,
   		prerequisites: string,
		created_at: string,
		updated_at: string
	}
}

```

---

```
/delete_posting [POST]
Request:
{
    posting_id : number ,
}
Response:
{
    status: boolean,
    data: message (Success / Error message as per status)
}

```

---

```
/add_posting [POST]
Request:
{
    title: string,
    professor: number (user id of professor),
    description: string,
    location: string,
    prerequisites: string
}
Response:
{
    status: boolean
    data: message (Success / Error message as per status)
    // CREATED_AT and UPDATED_AT timestamps to be appropriately set by the API
}

```

---

```
/get_all_postings [GET]
Request: N/A
Response:
{
	status: boolean,

	if status is True:
		data:
		[
			{
				posting_id: number,
				title: string,
				description: string,
				professor_email: string,
				professor_department: string,
				professor_designation: string
				professor_display_name: string,
				location: string,
				prerequisites: string,
				created_at: string,
				updated_at: string
			}
		]
	else:
	data: string (error message)
}

```

---

```
/get_all_application [GET]
Request: N/A
Response:
{
	status: boolean,

	if status is True:
		data:
		[
			{
				application_id: number,
				posting_id: number,
				title: string,
				description: string,
				location: string,
				prerequisites: string,
				created_at: string, (of the application, NOT the posting)
				updated_at: string, (of the application, NOT the posting)
				professor_user_id: number,
				professor_email: string,
				professor_department: string,
				professor_designation: string
				professor_display_name: string,
				student_user_id: number,
				student_display_name: string,
				student_email: string,
				student_phone: string,
				student_gpa: float,
				student_major: string,
				student_minor: string,
				student_year: string,
				status: string // This is the status of the application and NOT the response.
				remarks: string
			}
		]
	else:
	data: string (error message)
}

```

---

```
/update_posting [POST]
Request:
{
	posting_id: number,
	title: string,
	description: string,
	location: string,
	prerequisites: string,
}
Response:
{
	status: boolean
	data: (Success / Error message as per status)
	// UPDATED_AT timestamp should be auto updated by the API
}

```

---

```

/update_application [POST]
Request:
{
	application_id: number,
	status: string (This should be overwritten in the DB by API),
  remarks: string
}
Response:
{
	status: boolean
	data: (Success / Error message as per status)
	// UPDATED_AT timestamp should be auto updated by the API
}

```

---

```

/edit_profile
Request:
{
	user_id: number,
	email : string,
	password: string,
	display_name: string,
	type: string (Professor / Student),
	phone: string,
	if type == "Student":
		gpa: float,
		major: string,
		minor: string,
		degree: string,
		year: string
	elif type == "Professor":
		department: string,
		designation
}
Response:
{
	status: boolean
	data: (Success / Error message as per status)
}

```

---

```

/get_user_profile [POST]
Request:
{
	user_id: number
}
Response:
{
	status: boolean,
	data:
	{
		user_id: number,
		display_name: string,
		email: string,
		phone: string,
		type: string,
		if type == "Student":
			gpa: float,
			major: string,
			minor: string,
			degree: string,
			year: string
		elif type == "Professor":
			department: string,
			designation: string
	}

}

```

---

```
/add_application
Request:
{
	student: number,
	remarks: string,
	posting_id: number,
	status: string (By default it will be Pending)
}
Response:
{
	status: boolean
	data: message (Success / Error message as per status)
	// CREATED_AT and UPDATED_AT timestamps to be appropriately set by the API
}

```

---

```
/get_applications_for_professor [POST]
Request:
{
	professor: number
}
Response:
{
	status: boolean
	data:
	[
		{
			professor: number
			position_id: number,
			title: string,
			description: string,
			prerequisites: string,
			applications: // A list of all the applications for this position_id
			[
				{
					application_id: number
					student_user_id: number,
					student_display_name: string,
					student_email: string,
					student_phone: string,
					student_gpa: float,
					student_major: string,
					student_minor: string,
					student_year: string,
					status: string // This is the status of the application and NOT the response.
					remarks: string

				}
			]
		}
	]
}

```

# API Endpoints for Resume

Auto-generated using OpenAI

```python
# Resume API

This API provides endpoints for managing a user's resume. It includes endpoints for registering a new user, logging in, and managing resume data.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Python 3.x
* Flask
* Flask-JWT

### Installing

Install the required packages using the following command:
```

pip install -r requirements.txt

```python
## Endpoints

### /

This endpoint returns a simple message.

**Method:** GET

**URL:** /

**Response:**
```

### **/api/register**

This endpoint registers a new user.

**Method:** POST

**URL:** /api/register

**Data:**

```python
{
    "email": "user@example.com",
    "username": "username",
    "password": "password"
}
```

**Response:**

```python
{
    "response": "user created",
    "status": 201,
    "access_token": "access_token"
}
```

### **/api/login**

This endpoint logs in an existing user.

**Method:** POST

**URL:** /api/login

**Data:**

```python
{
    "email": "user@example.com",
    "password": "password"
}
```

**Response:**

```python
{
    "access_token": "access_token"
}
```

### **/api/get**

This endpoint returns the data of a user who is logged in.

**Method:** GET

**URL:** /api/get

**Headers:**

```python
Authorization: Bearer <access_token>
```

**Response:**

```python
[    {        "id": 1,        "user_id": 1,        "data": {...},        "type": "resume"    }]
```

### **/api/submit**

This endpoint saves data for a user who is logged in.

**Method:** POST

**URL:** /api/submit

**Headers:**

```python
Authorization: Bearer <access_token>
```

**Data:**

```python
{
    "data": {...},
    "type": "resume"
}
```

**Response:**

```python
{
    "a": "b"
}
```

### **/api/delete**

This endpoint deletes data for a user who is logged in.

**Method:** POST

**URL:** /api/delete

**Headers:**

```python
Authorization: Bearer <access_token>
```

**Data:**

```python
{
    "data_id": 1,
    "type": "resume"
}
```

**Response:**

```python
{
    "a": "b"
}

```

# Table Scheme for Resume

```python
credential
id (primary key, integer)
username (string, not null)
email (string, not null, unique)
password (string, not null)

users
id (primary key, integer)
username (string, not null)
email (string, not null)
website (string, nullable)
phone (string, not null)
user_id (foreign key to credential.id, not null)

edu
id (primary key, integer)
school (string, not null)
place (string, nullable)
program (string, nullable)
date (string, not null)
gpa (string, not null)
user_id (foreign key to credential.id, not null)

skill
id (primary key, integer)
name (string, not null)
contents (pickle, not null)
user_id (foreign key to credential.id, not null)

project
id (primary key, integer)
name (string, not null)
content (text, nullable)
tags (pickle, not null)
user_id (foreign key to credential.id, not null)

experience
id (primary key, integer)
title (string, not null)
organization (string, not null)
location (string, not null)
date (string, not null)
description (text, nullable)
user_id (foreign key to credential.id, not null)

foreign keys
users.user_id references credential.id
edu.user_id references credential.id
skill.user_id references credential.id
project.user_id references credential.id
experience.user_id references credential.id
```
