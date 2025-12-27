from flask import Flask, jsonify
from api.swagger import spec
from api.controllers.todo_controller import bp as todo_bp
from api.controllers.auth_controller import auth_bp as jwt_auth_bp
from api.controllers.customer_controller import customer_bp
from api.controllers.product_controller import product_bp
from api.controllers.order_controller import order_bp
from api.controllers.inventory_controller import inventory_bp
from api.controllers.course_controller import bp as course_bp
from api.controllers.reports_controller import reports_bp
from api.middleware import middleware
from api.responses import success_response
from infrastructure.databases import init_db
from config import Config
from flasgger import Swagger
from config import SwaggerConfig
from flask_swagger_ui import get_swaggerui_blueprint
from cors import init_cors


def create_app():
    app = Flask(__name__)

    # Initialize CORS first
    init_cors(app)

    Swagger(app)
    # Đăng ký blueprint trước
    app.register_blueprint(todo_bp)
    app.register_blueprint(jwt_auth_bp)  # JWT auth endpoints
    app.register_blueprint(customer_bp)
    app.register_blueprint(product_bp)
    app.register_blueprint(order_bp)
    app.register_blueprint(inventory_bp)
    app.register_blueprint(course_bp)
    app.register_blueprint(reports_bp)

     # Thêm Swagger UI blueprint
    SWAGGER_URL = '/docs'
    API_URL = '/swagger.json'
    swaggerui_blueprint = get_swaggerui_blueprint(
        SWAGGER_URL,
        API_URL,
        config={'app_name': "Todo API"}
    )
    app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

    try:
        init_db(app)
    except Exception as e:
        print(f"Error initializing database: {e}")

    # Register middleware
    middleware(app)

    # Register routes
    with app.test_request_context():
        for rule in app.url_map.iter_rules():
            # Thêm các endpoint khác nếu cần
            if rule.endpoint.startswith(('todo.', 'course.', 'user.', 'bizflow_auth.')):
                view_func = app.view_functions[rule.endpoint]
                print(f"Adding path: {rule.rule} -> {view_func}")
                spec.path(view=view_func)

    @app.route("/")
    def home():
        return jsonify({
            "message": "BizFlow API Server",
            "version": "1.0.0",
            "docs": "/docs",
            "auth": {
                "login": "/api/auth/login",
                "register": "/api/auth/register",
                "logout": "/api/auth/logout"
            }
        })

    @app.route("/swagger.json")
    def swagger_json():
        return jsonify(spec.to_dict())

    return app
# Run the application

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=9999, debug=True)
