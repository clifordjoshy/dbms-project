/register
POST
send: name, roll_no, email, password, confirm_password
recieve: access_token

/login/student
POST
send: roll_no, password
recieve: access_token

/login/ca
POST
send: club_name, password
recieve: access_token

/login/sa
POST
send: username, password (default is admin, admin)
recieve: access_token

/event_add
POST
send: event_name, event_desc, event_venue, max_limit, slot, date
recieve: event_id

/event_edit
POST
send: event_id, optionally(event_name, event_desc, event_venue, max_limit, slot, date)
recieve: event_id

/event_view
POST
send: event_id
recieve: event details

/club_edit
POST
send: club_name, club_desc
recieve: confirmation

/club_member_add
POST
send: roll_no, position
recieve: confirmation

/club_member_delete
POST
send: roll_no
recieve: confirmation

/club_add
POST
send: club_name, club_desc, password
recieve: confirmation

/venue_add
POST
send: venue_name
recieve: confirmation

/event_register
POST
send: event_id
recieve: confirmation

/events_all
GET
recieve: all event details

/events_future
GET
recieve: future event details

/events_student
GET
recieve: events the user is registered for

/clubs_all
GET
recieve: all club name and club_desc

/venues_all
GET
recieve: all venues

/club_members
GET
recieve: members of club administered by current user(ca)

/registered_students
GET
send: event_id
recieve: all participants

/club_info
GET
recieve: club_name, club_desc, members, events
