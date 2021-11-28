import datetime

from flask import jsonify, request
from flask_jwt_extended import (create_access_token, get_jwt_identity,
                                jwt_required)
from werkzeug.security import check_password_hash, generate_password_hash

from main import *
from models import (Students, Members, Clubs, Participation, Events, Bookings, Venues, SysAdmin,
                    event_schema, events_schema)

from flask_cors import cross_origin

from main import db
db.create_all()

@app.route('/register', methods=['POST'])
@cross_origin()
def user_register():
    try:
        name = request.json['name']
        roll_no = request.json['roll_no']
        email = request.json['email']
        password = request.json['password']
        hashed_password = generate_password_hash(password, method='sha256')
        confirm_password = request.json['confirm_password']
    except KeyError:
        return jsonify({"msg":"One or more fields are empty."})

    roll_number = Students.query.filter_by(roll_number=roll_no).first()

    if roll_number is None:
        if password == confirmpassword:
            new_student = Students(name, hashed_password, roll_no, email)

            db.session.add(new_student)
            db.session.commit()

            access_token = create_access_token(identity=roll_no)
            return jsonify(access_token=access_token)

        else:
            return jsonify({"message": "Passwords don't match"})
    
    else:
        return jsonify({ "message" : "Roll number already exists" })

@app.route("/login/student", methods=["POST"])
@cross_origin()
def stud_login():
    try:
        username = request.json['roll_no']
        password = request.json['password']
    except KeyError:
        return jsonify({"msg":"One or more fields are empty."})

    user = Students.query.filter_by(roll_number=username).first()
    
    if user is not None and check_password_hash( user.password, password):
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token)
    else:
        return jsonify({"message": "Incorrect roll number or password"})

@app.route("/login/ca", methods=["POST"])
@cross_origin()
def ca_login():
    try:
        username = request.json['club_name']
        password = request.json['password']
    except KeyError:
        return jsonify({"msg":"One or more fields are empty."})

    user = Clubs.query.filter_by(club=username).first()
    
    if user is not None and check_password_hash( user.password, password):
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token)
    else:
        return jsonify({"message": "Incorrect club name or password"})

@app.route("/login/sa", methods=["POST"])
@cross_origin()
def sa_login():
    try:
        username = request.json['username']
        password = request.json['password']
    except KeyError:
        return jsonify({"msg":"One or more fields are empty."})

    user = Users.query.filter_by(username=username).first()
    
    if user is not None and check_password_hash( user.password, password):
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token)
    else:
        return jsonify({"message": "Incorrect username or password"})

@app.route("/event_add", methods=['POST'])
@cross_origin()
@jwt_required()
def add_event():
    event_name = request.json['event_name']
    event_club = Clubs.query.filter_by(club=get_jwt_identity()).first().club
    event_desc = request.json['event_desc']
    event_venue = request.json['event_venue']
    max_limit = request.json['max_limit']
    slot = request.json['slot']
    date = datetime.date.strptime(request.json['date'], '%Y-%m-%d')

    booking= Bookings(event_venue, slot. date)
    db.session.add(booking)
    
    event = Events(event_name, event_club, event_desc, max_limit, booking.booking_id)
    db.session.add(event)
    db.session.commit()
    return jsonify({"event_id":f"{event.event_id}"})

@app.route("/event_edit", methods=['POST'])
@cross_origin()
@jwt_required()
def edit_event():
    event_id = request.json['event_id']
    event = Event.query.filter_by(event_id=event_id).first()
    event_name = request.json['event_name']
    booking = Bookings.query.filter_by(booking_id=event.event_booking_id).first()
    event_club = Clubs.query.filter_by(club=get_jwt_identity()).first().club
    event.event_desc = request.json['event_desc']
    event.max_limit = request.json['max_limit']
    booking.slot = request.json['slot']
    booking.date = datetime.date.strptime(request.json['date'], '%Y-%m-%d')
    
    db.session.commit()
    return jsonify({"event_id":f"{event.event_id}"})

@app.route("/event_view", methods=['POST'])
@cross_origin()
@jwt_required()
def view_event():
    event_id = request.json['event_id']
    event = Event.query.filter_by(event_id=event_id).first().club
    event = event_schema.dump(event)
    
    return jsonify({"event":event})

@app.route("/club_edit", methods=['POST'])
@cross_origin()
@jwt_required()
def edit_club():
    club_name = request.json['club_name']
    club = Event.query.filter_by(club_name=club_name).first()
    club.club_desc = request.json['club_desc']
    
    db.session.commit()
    return jsonify({"club":f"{club_name}"})

@app.route("/club_member_add", methods=['POST'])
@cross_origin()
@jwt_required()
def add_member():
    club_name = request.json['club_name']
    roll_nos = request.json['roll_nos']

    for roll_no in roll_nos:
        member = Members(roll_no, club_name, "pos1")
        db.session.add(member)
        db.session.commit()
    return jsonify({"msg":"Members added."})

@app.route("/club_member_delete", methods=['POST'])
@cross_origin()
@jwt_required()
def delete_member():
    club_name = request.json['club_name']
    roll_nos = request.json['roll_nos']

    for roll_no in roll_nos:
        member = Member.query.filter_by(member_roll_number=roll_no).first()
        db.session.delete(member)
        db.session.commit()
    return jsonify({"msg":"Members deleted."})

@app.route("/club_add", methods=['POST'])
@cross_origin()
@jwt_required()
def add_club():
    club_name = request.json['club_name']  
    club_desc = request.json['club_desc']
    password = request.json['password']
    
    club = Clubs(club_name,club_desc,password)
    db.session.add(club)
    db.session.commit()
    return jsonify({"New club added to Database"})

@app.route("/venue_add", methods=['POST'])
@cross_origin()
@jwt_required()
def add_venue():
    venue_name = request.json['venue_name']         
    
    venue = Venue(venue_name)
    db.session.add(venue)
    db.session.commit()
    return jsonify({"New venue added to Database"})


# @app.route("/all_questions", methods=['GET'])
# @cross_origin()
# def index():
#     polls = Question.query.all()
#     polls = questions_schema.dump(polls)
#     return jsonify({"all_questions":polls})

# @app.route("/questions", methods=['GET'])
# @cross_origin()
# @jwt_required()
# def user_questions():
#     user = Users.query.filter_by(username=get_jwt_identity()).first().user_id
#     polls = Question.query.filter_by(question_author=user)
#     polls = questions_schema.dump(polls)
#     return jsonify({"questions":polls})

# @app.route("/create_question", methods=['POST'])
# @cross_origin()
# @jwt_required()
# def create_question():
#     question_text = request.json['question_text']
#     question_author = Users.query.filter_by(username=get_jwt_identity()).first().user_id
#     deadline = datetime.datetime.strptime(request.json['deadline'], '%Y-%m-%dT%H:%M:%S.%fZ')
#     choices = request.json['choices']
    
#     ques = Question(question_text, question_author, deadline)
#     db.session.add(ques)
#     db.session.commit()
#     for choice_text in choices:
#         choice = Choice(choice_text, ques.question_id)
#         db.session.add(choice)
#         db.session.commit()
#     return jsonify({"question_id":f"{ques.question_id}"})

# @app.route("/<id>/add_choice", methods=['POST'])
# @cross_origin()
# @jwt_required(id)
# def add_choice(id):
#     choice_text = request.json['choice_text']
    
#     choice = Choice(choice_text, id)
#     db.session.add(choice)
#     db.session.commit()
#     return jsonify({"choice_id":f"{choice.choice_id}"})

# @app.route("/<id>/delete_choice", methods=['POST'])
# @cross_origin()
# @jwt_required(id)
# def delete_choice(id):   
#     choice_id = request.json['choice_id']
#     choice = Choice.query.filter_by(choice_id=choice_id).first()
#     db.session.delete(choice)
#     db.session.commit()
#     return jsonify({"deleted choice_id":f"{choice.choice_id}"})

# #post:vote, get:info
# @app.route("/<id>", methods=['POST','GET'])
# @cross_origin()
# def question(id):
#     ques = Question.query.filter_by(question_id=id).first()
#     if ques is None:
#         return jsonify({"msg":"Question does not exist."})
#     if request.method == 'POST':
#         if ques.deadline < datetime.datetime.now():
#             ques = question_schema.dump(ques)
#             return jsonify({"question":ques, "msg":"Deadline has passed."})
#         voted_choice = request.json['choice_id']
#         choice = Choice.query.filter_by(choice_id=voted_choice).first()
#         choice.votes = choice.votes + 1
#         db.session.commit()
#         return jsonify({"voted for choice_id":f"{choice.choice_id}"})

#     else:
#         ques = Question.query.filter_by(question_id=id).first()
#         choices = Choice.query.filter_by(question=id).all()
#         ques = question_schema.dump(ques)
#         choices = choices_schema.dump(choices)
#         return jsonify({"question":ques, "choices":choices})

# #post:update, get:vote count
# @app.route("/<id>/admin", methods=['POST', 'GET'])
# @cross_origin()
# @jwt_required()
# def question_admin(id):
#     ques = Question.query.filter_by(question_id=id).first()
#     if ques.question_author == Users.query.filter_by(username=get_jwt_identity()).first().user_id:
#         if request.method == 'POST':
#             ques.question_text = request.json['question_text']
#             ques.deadline = datetime.datetime.strptime(request.json['deadline'], '%Y-%m-%dT%H:%M:%S.%fZ')
#             choices_add = request.json['choices_created']
#             choices_update = request.json['choices_edited']
#             db.session.commit()
#             for choice in choices_add:
#                 choice = Choice(choice['choice_text'], ques.question_id)
#                 db.session.add(choice)
#                 db.session.commit()
#             for choice in choices_update:
#                 choice_entry = Choice.query.filter_by(choice_id=choice['choice_id']).first()
#                 choice_entry.choice_text = choice['choice_text']
#                 db.session.commit()
#             return jsonify({"msg":"updated"})

#         else:
#             choices = Choice.query.filter_by(question=id).all()
#             ques = question_schema.dump(ques)
#             choices = choices_admin_schema.dump(choices)
#             return jsonify({"question":ques, "choices":choices})
#     else:
#         return jsonify({"msg":"This question was posted by a different user."})


if __name__ == "__main__":
    app.run(debug=True)
