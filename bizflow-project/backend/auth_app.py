from flask import Flask
from config import Config
from cors import init_cors
from api.controllers.bizflow.auth_controller import bp as auth_bp
from infrastructure.databases import init_db
from app_logging import setup_logging
from api.middleware import middleware

def create_auth_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    init_db(app)
    middleware(app)

    # Initialize CORS
    init_cors(app)

    # Register auth blueprint
    app.register_blueprint(auth_bp)

    return app

if __name__ == '__main__':
    app = create_auth_app()
    app.run(host='0.0.0.0', port=9997, debug=True)
