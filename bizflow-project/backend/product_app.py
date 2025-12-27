from flask import Flask
from config import Config
from cors import init_cors
from api.controllers.product_controller import product_bp
from infrastructure.databases import init_db
from app_logging import setup_logging
from api.middleware import middleware

def create_product_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    init_db(app)
    middleware(app)

    # Initialize CORS
    init_cors(app)

    # Register product blueprint
    app.register_blueprint(product_bp)

    return app

if __name__ == '__main__':
    app = create_product_app()
    app.run(host='0.0.0.0', port=9998, debug=True)
