# NCMS Backend

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
