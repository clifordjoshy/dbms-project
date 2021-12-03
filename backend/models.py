from main import db, ma
from enum import Enum

# clear db metadata object
db.metadata.clear()

#defining all tables and schema as defined in the Design document

class Students(db.Model):
    name = db.Column(db.String(50))
    password = db.Column(db.String(100))
    roll_number = db.Column(db.String(9), primary_key = True)
    email = db.Column(db.String(100))

    def __init__(self, name, password, roll_number, email):
        self.name = name
        self.password = password
        self.roll_number = roll_number
        self.email = email
        
class StudentsSchema(ma.Schema):
    class Meta:
        fields = ('name','roll_number','email')
student_schema = StudentsSchema()
        

class Members(db.Model):
    member_roll_number = db.Column(db.String(9), db.ForeignKey('students.roll_number'), primary_key = True)
    club = db.Column(db.String(50), db.ForeignKey('clubs.club_name'))
    position = db.Column(db.String(50))

    def __init__(self, rollnumber, club, position):
        self.member_roll_number = rollnumber
        self.club = club
        self.position = position
        
class MembersSchema(ma.Schema):
    class Meta:
        fields = ('member_roll_number','position')
members_schema = MembersSchema(many=True)


class Clubs(db.Model):
    club_name = db.Column(db.String(50), primary_key = True)
    password = db.Column(db.String(100))
    club_desc = db.Column(db.String(200))

    def __init__(self, club_name, club_desc, password):
        self.club_name = club_name
        self.club_desc = club_desc
        self.password = password

class ClubsSchema(ma.Schema):
    class Meta:
        fields = ('club_name', 'club_desc')

clubs_schema = ClubsSchema(many=True)

class Participation(db.Model):
    participation_roll = db.Column(db.String(9), db.ForeignKey('students.roll_number'), primary_key = True)
    participation_event = db.Column(db.Integer, db.ForeignKey('events.event_id'),primary_key = True)

    def __init__(self, participation_roll, participation_event):
        self.participation_roll = participation_roll
        self.participation_event = participation_event

class Events(db.Model):
    event_id = db.Column(db.Integer, primary_key = True)
    event_name = db.Column(db.String(100))
    event_club = db.Column(db.String(50), db.ForeignKey('clubs.club_name'))
    event_desc = db.Column(db.String(200))
    max_limit = db.Column(db.Integer)
    event_booking_id = db.Column(db.Integer, db.ForeignKey('bookings.booking_id'))

    def __init__(self, event_name, event_club, event_desc, max_limit, event_booking_id):
        self.event_name = event_name
        self.event_club = event_club
        self.event_desc = event_desc
        self.max_limit  = max_limit
        self.event_booking_id = event_booking_id

class EventsSchema(ma.Schema):
    class Meta:
        fields = ('event_id', 'event_name', 'event_club', 'event_desc' ,'max_limit', 'event_booking_id')

event_schema = EventsSchema()
events_schema = EventsSchema(many=True)

class Bookings(db.Model):
    booking_id = db.Column(db.Integer, primary_key = True)
    booking_venue_name = db.Column(db.String(50), db.ForeignKey('venues.venue_name'))
    slot = db.Column(db.String(50))
    date = db.Column(db.DateTime)

    def __init__(self, booking_venue_name, slot, date):
        self.booking_venue_name = booking_venue_name
        self.slot = slot
        self.date = date

class Venues(db.Model):
    venue_name = db.Column(db.String(50), primary_key = True)

    def __init__(self, venue_name):
        self.venue_name = venue_name
        
class VenuesSchema(ma.Schema):
    class Meta:
        fields = ('venue_name', )
venues_schema = VenuesSchema(many=True)

class SysAdmin(db.Model):
    admin_username = db.Column(db.String(50), primary_key = True)
    admin_password = db.Column(db.String(100))

    def __init__(self, admin_username, admin_password):
        self.admin_username = admin_username
        self.admin_password = admin_password



if __name__ == "__main__":
    db.create_all()
