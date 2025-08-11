from flask import Blueprint, request, jsonify, current_app
from app import db, bcrypt
from models import User
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'student').lower()
    if role not in ('student', 'staff'):
        return jsonify({'error': 'role must be student or staff'}), 400
    if not username or not email or not password:
        return jsonify({'error': 'username, email, password required'}), 400

    if User.query.filter((User.username==username)|(User.email==email)).first():
        return jsonify({'error': 'user exists'}), 400

    pw_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    user = User(username=username, email=email, password_hash=pw_hash, role=role)
    db.session.add(user)
    db.session.commit()

    token = create_access_token(identity={'id': user.id, 'username': user.username, 'role': user.role})
    return jsonify({'token': token, 'user': {'id': user.id, 'username': user.username, 'role': user.role}}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    identifier = data.get('identifier')  # username or email
    password = data.get('password')
    if not identifier or not password:
        return jsonify({'error': 'identifier and password required'}), 400

    user = User.query.filter((User.username==identifier)|(User.email==identifier)).first()
    if not user or not bcrypt.check_password_hash(user.password_hash, password):
        return jsonify({'error': 'invalid credentials'}), 401

    token = create_access_token(identity={'id': user.id, 'username': user.username, 'role': user.role})
    return jsonify({'token': token, 'user': {'id': user.id, 'username': user.username, 'role': user.role}}), 200
