from main import db, ma
from enum import Enum

# clear db metadata object
db.metadata.clear()


class Students(db.Model):
    name = db.Column(db.String(50))
    password = db.Column(db.String(100))
    roll_number = db.Column(db.String(9), primary_key = True)
    email = db.Column(db.String(100))

    def __init__(self, name, password, roll_number, email):
        self.name = name
        self.password = password
        self.roll_number = rollNumber
        self.email = email

class Members(db.Model):
    member_roll_number = db.Column(db.String(9), primary_key = True, db.ForeignKey('students.roll_number'))
    club = db.Column(db.String(50), db.ForeignKey('clubs.club_name'))
    position = db.Column(Enum("pos1", "pos2", "pos3"))

    def __init__(self, rollnumber, club, position):
        self.rollnumber = rollnumber
        self.club = club
        self.position = position


class Clubs(db.Model):
    club_name = db.Column(db.String(50), primary_key = True)
    password = db.Column(db.String(100))
    club_desc = db.Column(db.String(200))

    def __init__(self, name, password, rollNumber, email):
        self.club_name = club_name
        self.club = club
        self.position = position

class Participation(db.Model):
    participation_roll = db.Column(db.String(9), primary_key = True, db.ForeignKey('students.roll_number'))
    participation_event = db.Column(db.Integer, db.ForeignKey('event.event_id'))

    def __init__(self, participation_roll, participation_event):
        self.participation_roll = participation_roll
        self.participation_event = participation_event

class Events(db.Model):
    event_id = db.Column(db.Integer, primary_key = True)
    event_name = db.Column(db.String(100))
    event_club = db.Column(db.String(50), db.ForeignKey('clubs.club_name'))
    event_desc = db.Column(db.String(200))
    max_limit = db.Column(db.Integer)
    event_booking_id = db.Column(db.Integer, db.ForeignKey('booking.booking_id'))

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
    booking_venue_name = db.Column(db.String(50), ForeignKey('venues.venue_name'))
    slot = db.Column(Enum("slot1", "slot2", "slot3"))\
    date = db.Column(db.DateTime)

    def __init__(self, booking_venue_name, slot, date):
        self.booking_venue_name = booking_venue_name
        self.slot = slot
        self.date = date

class Venues(db.Model):
    venue_name = db.Column(db.String(50), primary_key = True)

    def __init__(self, venue_name):
        self.venue_name = venue_name

class SysAdmin(db.Model):
    admin_username = db.Column(db.String(50), primary_key = True)
    admin_password = db.Column(db.strptime(100))

    def __init__(self, admin_username, admin_password):
        self.admin_username = admin_username
        self.admin_password = admin_password


# class Users(db.Model):
#     user_id = db.Column(db.Integer, primary_key = True)
#     username = db.Column(db.String(50), unique = True)
#     email = db.Column(db.String(100), unique = True)
#     password = db.Column(db.String(100))

#     def __init__(self, username, email, password):
#         self.username = username
#         self.email = email
#         self.password = password

# class UsersSchema(ma.Schema):
#     class Meta:
#         fields = ('user_id', 'username', 'email', 'password')

# users_schema = UsersSchema()


# class Question(db.Model):
#     question_id = db.Column(db.Integer, primary_key = True)
    # question_text = db.Column(db.String(100))
#     question_author = db.Column(db.Integer, db.ForeignKey('users.user_id'))
#     deadline = db.Column(db.DateTime)

#     def __init__(self, text, author, deadline):
#         self.question_text = text
#         self.question_author = author
#         self.deadline = deadline

# class QuestionSchema(ma.Schema):
#     class Meta:
#         fields = ('question_id', 'question_text', 'question_author', 'deadline')

# questions_schema = QuestionSchema(many=True)
# question_schema = QuestionSchema()

# class Choice(db.Model):
#     choice_id = db.Column(db.Integer, primary_key = True)
#     choice_text = db.Column(db.String(100))
#     question =  db.Column(db.Integer, db.ForeignKey('question.question_id'))
#     votes = db.Column(db.Integer)

#     def __init__(self, text, question_id):
#         self.choice_text = text
#         self.question = question_id
#         self.votes = 0

# class ChoiceSchema(ma.Schema):
#     class Meta:
#         fields = ('choice_id', 'choice_text', 'question')

# class ChoiceAdminSchema(ma.Schema):
#     class Meta:
#         fields = ('choice_id', 'choice_text', 'question', 'votes')

# choices_schema = ChoiceSchema(many=True)
# choices_admin_schema = ChoiceAdminSchema(many=True)

if __name__ == "__main__":
    db.create_all()