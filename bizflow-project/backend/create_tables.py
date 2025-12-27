from infrastructure.databases import init_db
from flask import Flask

app = Flask(__name__)
init_db(app)
print("Tables created successfully!")
