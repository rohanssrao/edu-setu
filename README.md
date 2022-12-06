<!-- ![Logo](./assets/Edu_Setu_Logo.gif) -->

<p align="center">
  <img src="./assets/Edu_Setu_Logo.gif" alt="Logo"/>
</p>


[![License](https://img.shields.io/github/license/jayrajmulani/group1-se-homeworks)](https://github.com/jayrajmulani/group2-se-homeworks/blob/main/LICENSE)
![Repo size](https://img.shields.io/github/repo-size/rohanssrao/edu-setu)
[![DOI](https://zenodo.org/badge/563549628.svg)](https://zenodo.org/badge/latestdoi/563549628)
[![backend](https://github.com/rohanssrao/edu-setu/actions/workflows/auto_test.yml/badge.svg)](https://github.com/rohanssrao/edu-setu/actions/workflows/auto_test.yml)
[![frontend](https://github.com/rohanssrao/edu-setu/actions/workflows/build_test_react.yml/badge.svg)](https://github.com/rohanssrao/edu-setu/actions/workflows/build_test_react.yml)
[![Contributors](https://img.shields.io/github/contributors/rohanssrao/edu-setu)](https://github.com/rohanssrao/edu-setu/graphs/contributors)

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About](#about)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
  - [Development Specifications](#development-specifications)
- [License](#license)
- [Future scope](#future-scope)
- [Contributors](#contributors)

---

<a href="https://app.animaker.com/animo/xJq8qgUlHE0MX9wp/"><h2>Intro Video</h2></a>

<p align="center">
  <a href="https://app.animaker.com/animo/xJq8qgUlHE0MX9wp/"><img src="./assets/video1.png" alt="Click me" width="50%" height="50%"/></a>
</p>

## New Features
* Resume Generator
* Student Skills
* GPA/Degree Requirements
* Application Questions
* Job Types
* Functional Posting Filters
* Edit Profile
* UI Improvements
* Bugfixes


## Demo of New Features
[<p align="center"><img src="https://i3.ytimg.com/vi/cVp6sCb1FUc/maxresdefault.jpg" width="50%" /></p>](https://www.youtube.com/watch?v=cVp6sCb1FUc)
---

## About


"Setu" literally translates to "Bridge" in Hindi.

Our project, Edu-Setu, as the name suggests, is a portal that bridges opportunities and can be immensely helpful in the education domain. We all know how cumbersome it can be to manage emails, segregate the important ones and keeping track of the _Loooooooonnngggggg_ mail chains. Opportunities get buried under these tons and tons of emails.

You might be wondering "what" opportunities exactly? Well, the one that every studnet desires to have and every professor usually need to offer! Yes, Edu-Setu facilitates professors to post opportunities for students which may include, but not liimited to:

- Research Opportunities
- Part time roles (On Campus)
- Project Opportunities
- Volunteering Opportunities

And, as you might have guessed, students can come in to apply and connect with the professors via this portal. Edu-Setu keeps the track of all the postings and applications, removing the hassle of "emailing" the professor and waiting for the opportunities to get buried.

Resume Editing Tool
Creating a personalized résumé for different job requirements can be a tedious task. That's why we developed a résumé-building tool to simplify this process. Our tool allows users to easily upload and organize their education, personal information, extracurricular activities, work experience, and skills. With just a few clicks, they can customize their résumé to match the requirements of a specific job and then download it as a PDF. Unlike many other résumé-building tools, our tool uses a professional, clean template that is suitable for job applications.

---

## Getting Started

The project is Dockerized to allow for portability and scalability. It uses a cloud database hosted with Oracle Cloud's free tier.

### Follow the below steps to get started:

1. [Install Docker](https://docs.docker.com/get-docker/), if it's not already installed in your system!
2. Start Docker Desktop.
3. Clone this repository.
4. Navigate to directory `code` and run the following:

```
docker compose up --build
```

5. Navigate to [localhost:3000](http://localhost:3000) to your browser.
6. Hit register to create your account.
7. Login to begin bridging opportunities!

### Alternative run method:
1. Clone the repository
2. In `code/backend`, run the following commands

```
pip3 install -r requirements.txt
flask run
```

3. Open a new terminal
4. In `code/frontend`, run the following commands

```
npm install
npm start
```
or 
```
npm install
npm run build
npm install -g serve
serve -s build -l 3000
```
5. Navigate to [localhost:3000](http://localhost:3000) to your browser.
6. Hit register to create your account
7. Login to begin bridging opportunities!

---

## Documentation

Documenation is contained in `code/docs`
<br/>

### Development Specifications

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

![ReactJS](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

![Python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)

![Oracle](https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=Oracle&logoColor=white)

The portal is developed with the above mentioned tech-stack. Detailed documentation for each component can be found as below:

1. [Backend](./code/backend/README.md)
2. [Frontend](./code/ui/README.md)

## License

This project is licensed under [MIT](https://mit-license.org/).

Further details regarding the license can be found [here](https://github.com/jayrajmulani/group1-se-homeworks/blob/main/LICENSE).

<a href="https://app.animaker.com/animo/xJq8qgUlHE0MX9wp/"><h2>Why FORK our project</h2></a>

<p align="center">
  <a href="https://app.animaker.com/animo/U8kmFueXtw7EeXdL/"><img src="./assets/video2.png" alt="Click me" width="50%" height="50%"/></a>
</p>

## Contributors

- [Jayraj Mulani](https://github.com/jayrajmulani)
- [Yashasya Shah](https://github.com/Yashasya)
- [Harshil Sanghvi](https://github.com/Harshil47)
- [Dhrumil Shah](https://github.com/Dhrumil0310)
- [Anisha Chazhoor](https://github.com/anishasc99)
