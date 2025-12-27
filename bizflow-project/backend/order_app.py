from flask import Flask
from config import Config
from cors import init_cors
from api.controllers.order_controller import order_bp
from infrastructure.databases import init_db
from api.middleware import middleware

def create_order_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    init_db(app)
    middleware(app)

    # Initialize CORS
    init_cors(app)

    # Register order blueprint
    app.register_blueprint(order_bp)

    return app

if __name__ == '__main__':
    app = create_order_app()
    app.run(host='0.0.0.0', port=9996, debug=True)
