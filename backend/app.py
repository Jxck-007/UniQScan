import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()

def create_app():
    app = Flask(__name__, instance_relative_config=True)
    # load .env settings if present
    from dotenv import load_dotenv
    load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'dev-jwt-secret')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///' + os.path.join(app.instance_path, 'app.db'))
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'uploads')
    os.makedirs(app.instance_path, exist_ok=True)
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    CORS(app)
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    # register blueprints
    from routes.auth import auth_bp
    from backend.routes.od import dash_bp
    from routes.research import research_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(dash_bp, url_prefix='/api/dashboard')
    app.register_blueprint(research_bp, url_prefix='/api/research')

    @app.route('/api/ping')
    def ping():
        return jsonify({'ok': True, 'msg': 'pong'})

    # create db tables if not exist (simple dev mode)
    with app.app_context():
        db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
