from models import Edu, Skill, Project, Extra, WorkExp, User


class AllUserData():
    def __init__(self, id):
        self.id = id
        self.edu_data = None
        self.skill_data = None
        self.project_data = None
        self.extra_data = None
        self.workexp_data = None
    # return a list doesn't work for user id

    def get_data_under_category(self, model):
        return model.query.filter_by(user_id=self.id).all()

    def get_data_of_user(self):
        self.user_data = self.get_data_under_category(User)
        self.edu_data = self.get_data_under_category(Edu)
        self.skill_data = self.get_data_under_category(Skill)
        self.project_data = self.get_data_under_category(Project)
        self.extra_data = self.get_data_under_category(Extra)
        self.workexp_data = self.get_data_under_category(WorkExp)

    def __iter__(self):
        for k, v in {'user_data': [dict(data) for data in self.user_data],
                     'edu_data': [dict(data) for data in self.edu_data],
                     'skill_data': [dict(data) for data in self.skill_data],
                     'project_data': [dict(data) for data in self.project_data],
                     'extra_data': [dict(data) for data in self.extra_data],
                     'workexp_data': [dict(data) for data in self.workexp_data]}.items():
            yield [k, v]
