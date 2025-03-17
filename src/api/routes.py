"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import os
from base64 import b64encode

api = Blueprint('api', __name__)
app = Flask(__name__)

# Allow CORS requests to this API
CORS(api, resources={r"/*": {"origins": "https://miniature-space-winner-5g4wggp64p9p2ppg-3000.app.github.dev"}})


@api.route('/register', methods=['POST'])
def register():
        body = request.json
        name = body.get("name", None)
        email = body.get("email", None)
        password = body.get("password", None)

        if name is None or email is None or password is None:
            return jsonify({'error': 'Name, email, and password are required'}), 400
        else:
            user = User()
            user_exist = User.query.filter_by(email=email).one_or_none()

        if user_exist is not None:
            return jsonify({'error': 'User already registered'}), 400
        else:
            salt = b64encode(os.urandom(32)).decode('utf-8')
            hashed_password = generate_password_hash(f'{password}{salt}')

            user.name = name
            user.email = email
            user.password = hashed_password
            user.salt = salt

            db.session.add(user)
            try:
                db.session.commit()
                return jsonify({'message': 'User created successfully'}), 201

            except Exception as error:
                print(error.args)
                db.session.rollback()
                return jsonify({'error': 'An error occurred'}), 500

@api.route('/login', methods=['POST'])
def login():

    try:
        body = request.json
        email = body.get('email', None)
        password = body.get('password', None)

        if email is None or password is None:
            return jsonify({'error': 'Email and password are required'}), 400
        else:
            user = User.query.filter_by(email=email).first()

        if user is None:
            return jsonify({'error': "User doesn't exist"}), 400
        else:
            print(user.serialize())

            if check_password_hash(user.password, f'{password}{user.salt}'):
                token = create_access_token(identity={"id": user.id, "email": user.email})
                return jsonify({"token": token, "current_user": user.serialize()}), 200
            else:
                return jsonify({'error': 'Incorrect email or password'}), 401

    except Exception as error:
        print(error)
        return jsonify({'error': 'An error occurred'}), 500
    
@api.route('/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Hello from Flask!"}), 200

# @api.route('/protected', methods=['GET'])
# @jwt_required()
# def protected():
#     try:
#         current_user = get_jwt_identity()
#         return jsonify({'message': 'Access granted', 'user': current_user}), 200

#     except Exception as error:
#         print(error)
#         return jsonify({'error': 'An error occurred'}), 500