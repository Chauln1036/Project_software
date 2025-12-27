from src.api.controllers.todo_controller import bp as todo_bp
from src.api.controllers.auth_controller import auth_bp
from src.api.controllers.product_controller import product_bp
from src.api.controllers.customer_controller import customer_bp
from src.api.controllers.inventory_controller import inventory_bp
from src.api.controllers.reports_controller import reports_bp

def register_routes(app):
    app.register_blueprint(todo_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(product_bp)
    app.register_blueprint(customer_bp)
    app.register_blueprint(inventory_bp)
    app.register_blueprint(reports_bp)
