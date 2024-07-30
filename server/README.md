# Blockchain app Backend

This project was bootstrapped with [`FastAPI`](https://fastapi.tiangolo.com).

## Get Started

To get started, make sure that `python` (v3.9+ is preferrable), and `pip` (v22.x+ is prefferable) are fully installed.

- **_(OPTIONAL)_**: If you have **virtual environments**, such as `Anaconda` or `pipenv`, you can basically copy and paste the commands to set up the environment.

- For `Anaconda`:

  ```bash
  conda create -n <Name> python="<Version>"
  conda activate <Name>
  ```

- **First of all**: Clone this project and install requirements package (In case you don't have the **virtual environments**).

  ```bash
  git clone https://github.com/cobeo2004/cos30049
  cd server
  pip install -r requirements.txt
  ```

- **Finally**: Run the following command to bootstrap the server.
  ```bash
  uvicorn main:app --reload
  ```

### Voila, now your server is running and will be served (by default) at: http://localhost:8000.

Should you have any further questions, FEAT or bugs, don't hesitate to raise on the `issues` section.

Best regards,

The Void
