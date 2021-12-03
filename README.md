<!-- This is a markdown file  -->
# DBMS Project: Group 6, NITC Club Management System

This is a club management system for NITC which allows clubs to manage their members and reserve slots for various venues over college in an efficient manner.

Group Members:
- Darshan Jayachandran
- Cliford Joshy
- Joel Mathew
- Karthik Sridhar
- Abin Gigo

# Frontend

## Implementation Details

It was made in React using Bootstrap components.

## Running the App

In the project directory, you can run:

### `npm install`

Installs the required dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Routes

The following routes are present in the app:
| Route | Component | Description |
| - | - | - |
| / | HomePage | The home page |
| /clubs/:clubname | ClubDetailsPanel | For a general user to see details about a club |
| /events | Events | To see a list of all the events as a general user |
| /student | StudentDetails | To see the details when logged in as a student |
| /student/events | StudentEvents | To register for events and see registered events when logged in as a student |
| /clubadmin | ClubAdminPanel | To create events and manage members of the club as a club admin |
| /clubadmin/:eventId| ClubEventPanel | To see and edit the event information and see registrations for an event as a club admin |
| /admin | SysAdminPanel | See a list of clubs and venues as a sys admin |
| /admin/createclub | SysAdminMakeClub | Create a club as a sys admin |
| /admin/createvenue | SysAdminMakeVenue | Create a venue as a sys admin |


# Backend

## Implementation Details

It was made in Flask with a SQLite database.

## Running the App

In the project directory, you can run:

### `pip install -r requirements.txt`

Installs the required dependencies

### `python run.py`

Runs the app in the development mode on port 5000.

## Routes

The following endpoints are present:

| Route | Type | Parameters | Response |
| - | - | - | - |
| /register | POST | name, roll_no, email, password, confirm_password | access_token |
| /login/student | POST | roll_no, password | access_token |
| /login/ca | POST | club_name, password | access_token |
| /login/sa | POST | username, password (default is admin, admin) | access_token |
| /event_add | POST | event_name, event_desc, event_venue, max_limit, slot, date | event_id |
| /event_edit | POST | event_id, optionally(event_name, event_desc, event_venue, max_limit, slot, date) | event_id |
| /event_view | POST | event_id | event details |
| /club_edit | POST | club_name, club_desc | confirmation |
| /club_member_add | POST | roll_no, position | confirmation |
| /club_member_delete | POST | roll_no | confirmation |
| /club_add | POST | club_name, club_desc, password | confirmation |
| /venue_add | POST | venue_name | confirmation |
| /event_register | POST | event_id | confirmation |
| /events_all | GET | | all event details |
| /events_future | GET | | future event details |
| /events_student | GET | | events the user is registered for |
| /clubs_all | GET | | all club name and club_desc |
| /venues_all | GET | | all venues |
| /club_members | GET | | members of club administered by current user(ca) |
| /registered_students | POST | event_id | all participants |
| /club_info | GET | | club_name, club_desc, members including roll no, events |
| /clubs/<club_name> | GET | | club_name, club_desc, members, events |
| /student_details | GET | | name, roll no, email |
