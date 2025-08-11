import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///' + os.path.join(BASE_DIR, 'instance', 'app.db'))
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET = os.getenv('JWT_SECRET', 'dev-jwt-secret')
    JWT_ALGORITHM = 'HS256'
    JWT_EXP_DELTA_SECONDS = int(os.getenv('JWT_EXP', 60*60*24))  # 1 day
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
    MAX_CONTENT_LENGTH = 50 * 1024 * 1024  # 50 MB
