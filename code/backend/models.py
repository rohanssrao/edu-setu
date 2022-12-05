from flask_sqlalchemy import SQLAlchemy
from passlib.apps import custom_app_context as pwd_context
import pickle
db = SQLAlchemy()

# helper method to unload pickle file


def unload_pickle(b):
    if b is None:
        return None
    else:
        return pickle.loads(b)


class UserLogin(db.Model):
    __tablename__ = 'credential'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    # store hashed password
    password = db.Column(db.String(50), unique=False, nullable=False)

    def hash_password(self, password):
        self.password = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password)


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(50), unique=False, nullable=False)
    website = db.Column(db.String[100], unique=False, nullable=True)
    phone = db.Column(db.String(15), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        "credential.id"), nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username

    def __iter__(self):
        return iter({
            'id': self.id,
            'name': self.username,
            'email': self.email,
            'website': self.website,
            'phone': self.phone,
            'external_id': self.user_id
        }.items())
# education


class Edu(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    school = db.Column(db.String(120), unique=False, nullable=False)
    place = db.Column(db.String(120), unique=False, nullable=True)
    program = db.Column(db.String(120), unique=False, nullable=True)
    date = db.Column(db.String(120), unique=False, nullable=False)
    gpa = db.Column(db.String(10), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        "credential.id"), nullable=False)

    def __iter__(self):
        return iter({
            'id': self.id,
            'name': self.school,
            'location': self.place,
            'program': self.program,
            'date': self.date,
            'gpa': self.gpa,
            "external_id": self.user_id
        }.items())
# skills


class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False, nullable=False)
    contents = db.Column(db.PickleType())
    user_id = db.Column(db.Integer, db.ForeignKey(
        "credential.id"), nullable=False)

    def __iter__(self):
        return iter({
            'id': self.id,
            'name': self.name,
            'contents': unload_pickle(self.contents),
            'external_id': self.user_id
        }.items())
# Projects


class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False, nullable=False)
    content = db.Column(db.Text(), unique=False, nullable=True)
    tags = db.Column(db.PickleType())
    user_id = db.Column(db.Integer, db.ForeignKey(
        "credential.id"), nullable=False)

    def __iter__(self):
        return iter({
            'id': self.id,
            'name': self.name,
            'content': self.content,
            'tags': unload_pickle(self.tags),
            'external_id': self.user_id
        }.items())
# work experience


class WorkExp(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), unique=False, nullable=False)
    location = db.Column(db.String(50), unique=False, nullable=True)
    contents = db.Column(db.PickleType(), unique=False, nullable=False)
    date = db.Column(db.String(100), unique=False, nullable=False)
    tags = db.Column(db.PickleType(), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        "credential.id"), nullable=False)

    def __iter__(self):
        return iter({
            'id': self.id,
            'name': self.title,
            'location': self.location,
            'contents': unload_pickle(self.contents),
            'date': self.date,
            'tags': unload_pickle(self.tags),
            'external_id': self.user_id
        }.items())
#awards or extracurriculars


class Extra(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=False, nullable=False)
    contents = db.Column(db.Text(), unique=False, nullable=True)
    tags = db.Column(db.PickleType(), nullable=True)
    date = db.Column(db.String(50), unique=False, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        "credential.id"), nullable=False)

    def __iter__(self):
        return iter({
            'id': self.id,
            'name': self.name,
            'contents': unload_pickle(self.contents),
            'tags': unload_pickle(self.tags),
            'date': self.date,
            'external_id': self.user_id
        }.items())
