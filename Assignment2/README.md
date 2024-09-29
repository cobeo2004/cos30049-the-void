# Flight Price Prediction Machine Learning Model

## Overview

This project demonstrates the process of building machine learning models to predict flight prices using German air fare data. We explore and compare the performance of three different algorithms: Random Forest Regressor, Gradient Boosting Regressor, and Random Forest Classifier.

## Goal

Our goal is to develop accurate models for predicting flight prices and gain insights into the factors that influence fare costs in the German air travel market.

## Authors

1. Ba Viet Anh (Henry) Nguyen
2. Xuan Tuan Minh Nguyen
3. Trong Dat Hoang

## How to Run

### 1. Configure the Project Environment

1. Create a new conda environment:

   ```bash
   conda create -n flight_price_env python=3.10.9
   ```

2. Activate the environment:

   ```bash
   conda activate flight_price_env
   ```

3. Install required dependencies:
   ```bash
   pip install pandas numpy scikit-learn scipy matplotlib seaborn datetime scikit-optimize statsmodels mlxtend
   ```

### 2. Data Processing and Model Training

1. Ensure the 'German Air Fares.csv' file is in the project directory.

2. Open and run the `germanflightprice_predict.ipynb` notebook:

   ```bash
   jupyter notebook germanflightprice_predict.ipynb
   ```

3. Execute each cell in order, following these steps:

   a. Data Loading and Exploration:

   - Load the dataset using `pd.read_csv('German Air Fares.csv')`
   - Examine the data with `df.head()`, `df.info()`, and `df.describe()`

   b. Data Preprocessing:

   - Handle missing values: `df.dropna()`
   - Convert dates: `pd.to_datetime(df['date_column'])`
   - Feature engineering:
     ```python
     df['day_of_week'] = df['departure_date'].dt.dayofweek
     df['month'] = df['departure_date'].dt.month
     df['days_until_departure'] = (df['departure_date'] - df['scrape_date']).dt.days
     ```
   - Encode categorical variables:
     ```python
     encoder = OneHotEncoder(sparse=False, handle_unknown='ignore')
     encoded_features = encoder.fit_transform(df[['categorical_column']])
     ```
   - Scale numerical features:
     ```python
     scaler = MinMaxScaler()
     scaled_features = scaler.fit_transform(df[['numerical_column']])
     ```

   c. Model Training:

   - Split the data:
     ```python
     X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=9214)
     ```
   - Train the Gradient Boosting Regressor:
     ```python
     gb = GradientBoostingRegressor(random_state=9214)
     gb.fit(X_train, y_train)
     ```

   d. Hyperparameter Tuning:

   - Define parameter grid:
     ```python
     param_grid = {
         'n_estimators': [100, 200],
         'learning_rate': [0.05, 0.1],
         'max_depth': [3, 4],
         'min_samples_split': [5, 10],
         'min_samples_leaf': [2, 4],
         'subsample': [0.8],
         'max_features': ['sqrt', None]
     }
     ```
   - Perform Grid Search:
     ```python
     grid_search = GridSearchCV(gb, param_grid, cv=3, n_jobs=-1, verbose=2, scoring=custom_score)
     grid_search.fit(X_train, y_train)
     ```
   - Train best model:
     ```python
     best_gb = GradientBoostingRegressor(**grid_search.best_params_, random_state=9214)
     best_gb.fit(X_train, y_train)
     ```

### 3. Using the Model for Prediction

After training, use the model for predictions as follows:

1. Prepare your input data in the same format as X_test_final_rg.

2. Make predictions:

   ```python
   predictions = best_gb.predict(your_input_data)
   ```

3. Example:
   ```python
   sample_input = np.array([[0.5, 0.3, 1, 0, 0, 1, 0.7]])  # Scaled and encoded features
   predicted_price = best_gb.predict(sample_input)
   print(f"Predicted flight price: {predicted_price[0]:.2f} EUR")
   ```

## Note

- Ensure all required libraries are installed and the data file is in the correct location.
- The random state (9214) is set for reproducibility.
- For detailed explanations of each step, refer to the comments in the Jupyter notebook.
