import json
import pickle
from models import User, Edu, Skill, Project, Extra, WorkExp


def upload(db, object):
    try:
        db.session.add(object)
        db.session.commit()
        return True
    except:
        # TODO adding error messages
        db.session.rollback()
        return False


def delete(object, db):
    try:
        db.session.delete(object)
        db.session.commit()
        return True
    except:
        db.session.rollback()
        return False


def delete_edu_data(user_id, data_id, db):
    entry = Edu.query.filter_by(id=data_id, user_id=user_id).first()
    delete(entry, db)


def delete_user_data(user_id, data_id, db):
    entry = User.query.filter_by(id=data_id, user_id=user_id).first()
    delete(entry, db)


def delete_skill_data(user_id, data_id, db):
    entry = Skill.query.filter_by(id=data_id, user_id=user_id).first()
    delete(entry, db)


def delete_project_data(user_id, data_id, db):
    entry = Project.query.filter_by(id=data_id, user_id=user_id).first()
    delete(entry, db)


def delete_workExp_data(user_id, data_id, db):
    entry = WorkExp.query.filter_by(id=data_id, user_id=user_id).first()
    delete(entry, db)


def delete_extra_data(user_id, data_id, db):
    entry = Extra.query.filter_by(id=data_id, user_id=user_id).first()
    delete(entry, db)


def delete_from_db(user_id, data_id, data_type, db):
    if user_id is None or data_type is None or data_id is None:
        return False
    try:
        if data_type == "edu_data":
            delete_edu_data(user_id, data_id, db)
        elif data_type == "user_data":
            delete_user_data(user_id, data_id, db)
        elif data_type == "skill_data":
            delete_skill_data(user_id, data_id, db)
        elif data_type == "project_data":
            delete_project_data(user_id, data_id, db)
        elif data_type == "workExp_data":
            delete_workExp_data(user_id, data_id, db)
        elif data_type == "extra_data":
            delete_extra_data(user_id, data_id, db)
        else:
            raise Exception("CATEGORY_NOT_DEFINED")
    except:
        return False
    return True

# not includeing userlogin credential


def save_json_to_db(user_id, json_data, db):
    data_type = None
    data = None
    try:
        data_type = json_data[0]
        data = json_data[1]
    except:
        return False
    try:
        if data_type == "edu_data":
            save_edu_data(user_id, data, db)
        elif data_type == "user_data":
            save_user_data(user_id, data, db)
            user_id = User.query.filter_by(email='jchen42@ncsu.edu').first().id
        elif data_type == "skill_data":
            save_skill_data(user_id, data, db)
        elif data_type == "project_data":
            save_project_data(user_id, data, db)
        elif data_type == "workExp_data":
            save_workExp_data(user_id, data, db)
        elif data_type == "extra_data":
            save_extra(user_id, data, db)
        else:
            raise Exception("CATEGORY_NOT_DEFINED")
    except:
        return False
    return True


def update_user_data(data, db):
    user_id = data['id']
    data_id = data[1][0]
    data_type = data[1][1]
    data_to_update = data[1][2]
    user = User.query.get(id)
    for entry in data_to_update:
        user[entry] = data_to_update[entry]

    try:
        db.commit()
        return True

    except:
        db.session.rollback()
        return False


def save_user_data(id, data, db):
    name = data.get('name', None)
    email = data.get('email', None)
    phone = data.get('phone', None)
    website = data.get('website', None)
    user = User(username=name, email=email, phone=phone,
                website=website, user_id=id)
    return upload(db, user)


def save_edu_data(id, data, db):
    name = data.get('name', None)
    loc = data.get('location', None)
    date = data.get('date', None)
    program = data.get('program', None)
    gpa = data.get('gpa', None)
    edu = Edu(school=name, place=loc, gpa=gpa,
              program=program, date=date, user_id=id)
    return upload(db, edu)


def save_skill_data(id, data, db):
    name = data.get('name', None)
    contents = pickle.dumps(data.get('contents', None))
    skill = Skill(name=name, contents=contents, user_id=id)
    return upload(db, skill)


def save_project_data(id, data, db):
    name = data.get('name', None)
    content = data.get('content', None)
    tags = pickle.dumps(data.get('tags', None))
    project = Project(name=name, content=content, tags=tags, user_id=id)
    upload(db, project)


def save_workExp_data(id, data, db):
    title = data.get('name', None)
    location = data.get('location', None)
    contents = pickle.dumps(data.get('contents', None).split('\n'))
    tags = pickle.dumps(data.get('tags'), None)
    date = data.get('date', None)
    project = WorkExp(title=title, location=location,
                      contents=contents, date=date, tags=tags, user_id=id)
    upload(db, project)


def save_extra(id, data, db):
    name = data.get('name', None)
    contents = pickle.dumps(data.get('contents', None).split('\n'))
    tags = pickle.dumps(data.get('tags'), None)
    extra = Extra(name=name, user_id=id, contents=contents, tags=tags)
    upload(db, extra)


def upload_json_file_to_db(user_id, db):
    data = None
    with open('/Users/lamonkey/Desktop/resume_generator/data.json', 'r') as f:
        data = json.load(f)
    for entry in data:
        category = list(entry.keys())[0]
        entry_content = entry[category]
        if category == "education":
            save_edu_data(user_id, entry_content, db)
        elif category == "user":
            save_user_data(user_id, entry_content, db)
        elif category == "skill":
            save_skill_data(user_id, entry_content, db)
        elif category == "project":
            save_project_data(user_id, entry_content, db)
        elif category == "work_expirence":
            save_workExp_data(user_id, entry_content, db)
        elif category == "extra":
            save_extra(user_id, entry_content, db)
        else:
            raise Exception("CATEGORY_NOT_DEFINED")

        # print(f"category is {category}")
        # print(entry[category])
    # [print(list(entry.keys())[0]) for entry in data]
