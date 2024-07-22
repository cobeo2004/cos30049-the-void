# Blockchain app Backend

This project was bootstrapped with [`Django`](https://www.djangoproject.com/) and [`DjangoRESTFramework`](https://www.django-rest-framework.org/)

## Get Started

To get started, make sure that `python` (v3.9+ is preferrable), and `pip` (v22.x+ is prefferable) are fully installed.

- **_(OPTIONAL)_**: If you have **virtual environments**, such as `Anaconda` or `pipenv`, you can basically copy and paste the commands to set up the environment.

- For `Anaconda`:
  ```bash
  conda create -n <Name> python="<Version>"
  conda activate <Name>
  conda config --add channels conda-forge
  conda install djangorestframework
  conda install django
  conda install environs
  ```
- For `pipenv`:

  ```bash
  pipenv shell
  pipenv install django
  pipenv install djangorestframework
  pipenv install environs
  ```

- **First of all**: Clone this project and install requirements package (In case you don't have the **virtual environments**).

  ```bash
  git clone https://github.com/cobeo2004/cos30049
  cd server
  pip install -r requirements.txt
  ```

- **Then**: Run the following command to make database migrations.

  ```bash
  python manage.py makemigrations
  python manage.py migrate
  ```

- **Finally**: Run the following command to bootstrap the server.
  ```bash
  python manage.py runserver
  ```

### Voila, now your server is running and will be served (by default) at: http://localhost:8080.

Should you have any further questions, FEAT or bugs, don't hesitate to raise on the `issues` section.

Best regards,

The Void
