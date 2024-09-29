# Civil Aviation Prediction Application by The Void

## Brief introduction

Welcome to our project! In this repository, we will be working on an exciting and innovative solution. Our goal is to create a good looking website that leverages the power AI to predict the price and the delay causes of the airline carriers and provide a seamless experience for our users. We are a dedicated team of developers who are passionate about creating cutting-edge software. Join us on this journey as we strive to make a positive impact in the world of technology.

## Team member

- [Xuan Tuan Minh Nguyen](https://github.com/cobeo2004)
- [Trong Dat Hoang](https://github.com/trongdathoang)
- [Ba Viet Anh Nguyen](https://github.com/vtank4)

## Objectives

Leaves blank !

## Our Techstack

- **Front-end**
  - Programming Language: `JavaScript` (with type declaration using `jsdoc`), `HTML` and `CSS`.
  - Libraries & Frameworks:
    - `React`: Main library for writing `HTML` code in `JavaScript`.
    - `TailwindCSS`: For a powerful and easy styling.
    - `shadcn/ui`: Empowers the `radix-ui` library by creating instant components.
    - `aceternity-ui`: Empowers the `radix-ui`, `shadcn/ui` and `framer-motion` library to create instant and smooth moition instant components.
    - `tanstack/react-query-table`: Make table query easier than before.
- **Back-end**
  - Programming Language: `Python`.
  - Libraries & Frameworks:
    - `FastAPI`: For creating a scalable and RESTful Application Programming Interface (API).
    - `Prisma`: A powerful **Object Relational Mapping (ORM)** for creating database without actually interacting with `SQL language`.
  - Machine Learning:
    - `Tensorflow`: For a full-range framework that supports create **neutral network**.
    - `pandas`, `scikit-learn`: Leverage handling faulty data.
    - `Apache Kafka`: For a scalable and reliable **data streaming** that could handles big amount of requests.
  - Hosting:
    - `Docker` and `docker-compose`: To host the `PostgreSQL`, `Apache Kafka` and `Apache ZooKeeper` images in a safe virtual environment.
- **Database**
  - `PostgreSQL`: Main relational database for the project.

- **Version Control**
  - `Github`: Controlling the version and the development of the project.
  - `Github Action`: Run automation tests and deploys for the project.

Regards,

The Void




# Flight Price Prediction Machine Learning Project

This project aims to predict flight prices using machine learning models built on German airfare data. The models are trained and evaluated to determine the factors influencing flight ticket prices, providing insights and accurate predictions.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Environment Setup](#environment-setup)
3. [Data Processing](#data-processing)
4. [Model Training](#model-training)
5. [Making Predictions](#making-predictions)
6. [Authors](#authors)

## Project Overview

This project demonstrates how to build machine learning models to predict flight prices. It explores three different models:
- **Random Forest Regressor**
- **Gradient Boosting Regressor**
- **Random Forest Classifier**

The workflow of the project includes:
1. Data loading and exploration
2. Data preprocessing and feature engineering
3. Model training and evaluation
4. Hyperparameter tuning (optional)
5. Prediction using the trained model

## Environment Setup

To run this project, you need to configure a Python environment with all necessary dependencies. Below is a detailed step-by-step guide on how to set up the environment using `Conda`:

### Step 1: Install Conda

If you haven't already installed Conda, follow the [Anaconda installation guide](https://docs.anaconda.com/anaconda/install/). Anaconda is a distribution of Python and R that simplifies package management and deployment.

### Step 2: Create and Activate the Project Environment

Open a terminal or command prompt and run the following commands to create a virtual environment for the project:

```bash
# Create a new conda environment with Python 3.10.9
conda create -n cos30049_env python=3.10.9

# Activate the new environment
conda activate cos30049_env

# Verify the environment setup
conda info --envs
```

### Step 3: Install Project Dependencies

Once the environment is active, install the necessary Python packages:

  # Install the required libraries
  pip install pandas scikit-learn
  
  The key dependencies are:
  
  pandas for data manipulation
  scikit-learn for machine learning models
  Ensure that all dependencies are correctly installed before proceeding.


### Data Processing
Before training the model, the dataset must be prepared through data preprocessing. This step ensures that the data is clean, features are encoded correctly, and the dataset is split into training and testing sets.

### Step 1: Load the Dataset
Ensure that the dataset is in the correct directory. Use the following code to load the data:

import pandas as pd

# Load the dataset
df = pd.read_csv('german_flight_data.csv')

# Preview the first few rows
df.head()

### Step 2: Data Preprocessing
To prepare the data for model training, we need to:
  Drop irrelevant columns.
  Encode categorical variables: Convert categorical features into numerical values.
# Drop columns that aren't needed
df = df.drop(['column_to_drop'], axis=1)

# Encode categorical columns
df['category_column'] = df['category_column'].astype('category').cat.codes

### Step3: Step 3: Split the Dataset
Next, we split the dataset into training and test sets. This allows us to train the model on one portion and evaluate it on another to measure performance:

from sklearn.model_selection import train_test_split

# Define features and target variable
X = df.drop('target_column', axis=1)
y = df['target_column']

# Split data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


### MODEL TRAINING
This section covers training the machine learning models. The example below shows how to train a Random Forest Regressor.

### Step 1: Initialize and Train the Model
from sklearn.ensemble import RandomForestRegressor

# Initialize the Random Forest Regressor
rf_regressor = RandomForestRegressor(n_estimators=100, random_state=42)

# Train the model
rf_regressor.fit(X_train, y_train)

### Step 2: Evaluate the Model
Once the model is trained, you can evaluate its performance by predicting the target values on the test set:
# Make predictions on the test data
y_pred = rf_regressor.predict(X_test)

### Step 3: Calculate Performance Metrics
You can calculate the mean squared error to assess how well the model performed:

from sklearn.metrics import mean_squared_error

# Calculate mean squared error
mse = mean_squared_error(y_test, y_pred)
print(f'Mean Squared Error: {mse}')

### USING THE MODEL FOR PREDICTION
Once the model has been trained and evaluated, you can use it to predict flight prices for new data. Here is a step-by-step guide to using the model for predictions.

### Step 1: Prepare the Input Data for Prediction
Make sure that any new input data for prediction is preprocessed in the same way as the training data. This includes applying any categorical encoding and removing irrelevant columns.

### Step 2: Use the Trained Model to Make Predictions
Once the new data is preprocessed, you can use the trained model (rf_regressor) to make predictions on this data.
# Load new flight data for prediction
new_data = pd.read_csv('new_flight_data.csv')

# Predict flight prices for the new data
predictions = rf_regressor.predict(new_data)

# Display the predictions
print(predictions)

### MAKING PREDICTIONS
Once the model has been trained and evaluated, you can use it to predict flight prices for new data.

### Step 1: Prepare the Input Data
Ensure that the input data is preprocessed in the same way as the training data (e.g., encoding, dropping irrelevant columns).

# Load new data
new_data = pd.read_csv('new_flight_data.csv')

# Preprocess the new data
new_data['category_column'] = new_data['category_column'].astype('category').cat.codes
new_data = new_data.drop(['column_to_drop'], axis=1)

### Step 2: Make Predictions
Use the trained model to predict prices for the new data:

# Predict flight prices
predictions = rf_regressor.predict(new_data)

# Display predictions
print(predictions)

### Step 3: Save Predictions (Optional)
If you want to save the predictions for further use:

# Save predictions to a CSV file
new_data['predicted_price'] = predictions
new_data.to_csv('predicted_flight_prices.csv', index=False)

### AUTHORS
This project was developed by:

Ba Viet Anh (Henry) Nguyen
Xuan Tuan Minh Nguyen
Trong Dat Hoang
