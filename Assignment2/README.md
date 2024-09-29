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

3. Execute each cell in order, following these detailed steps:

   a. **Data Loading and Exploration:**

   - Load the dataset using `pd.read_csv('German Air Fares.csv')`:
     ```python
     df = pd.read_csv('German Air Fares.csv')
     ```
   - Examine the data with:
     ```python
     print(df.head())
     print(df.info())
     print(df.describe())
     ```

   b. **Data Preprocessing:**

   - **Handle Missing Values:**

     ```python
     df = df.dropna()
     ```

   - **Convert Dates:**

     ```python
     df['scrape_date'] = pd.to_datetime(df['scrape_date'], format='%d.%m.%Y')
     df['departure_date'] = pd.to_datetime(df['departure_date'], format='%d.%m.%Y')
     ```

   - **Feature Engineering:**

     - Extract day of week, month, and calculate days until departure:
       ```python
       df['day_of_week'] = df['departure_date'].dt.dayofweek
       df['month'] = df['departure_date'].dt.month
       df['days_until_departure'] = (df['departure_date'] - df['scrape_date']).dt.days
       ```

   - **Encode Categorical Variables:**

     ```python
     encoder = OneHotEncoder(sparse=False, handle_unknown='ignore')
     encoded_features = encoder.fit_transform(df[['departure_city', 'arrival_city', 'airline', 'stops']])
     encoded_df = pd.DataFrame(encoded_features, columns=encoder.get_feature_names_out())
     df = df.join(encoded_df)
     df.drop(['departure_city', 'arrival_city', 'airline', 'stops'], axis=1, inplace=True)
     ```

   - **Scale Numerical Features:**

     ```python
     scaler = MinMaxScaler()
     df[['price (€)', 'days_until_departure']] = scaler.fit_transform(df[['price (€)', 'days_until_departure']])
     ```

   - **Feature Selection:**
     - Use correlation analysis and VIF to select features:
       ```python
       corr_matrix = df.corr()
       print(corr_matrix['price (€)'].sort_values(ascending=False))
       # Select features with high correlation to the target variable
       selected_features = ['days_until_departure', 'day_of_week', 'month'] + list(encoder.get_feature_names_out())
       X = df[selected_features]
       y = df['price (€)']
       ```

   c. **Model Training:**

   - **Split the Data:**

     ```python
     X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=9214)
     ```

   - **Train the Random Forest Regressor:**

     ```python
     rf_regressor = RandomForestRegressor(random_state=9214)
     rf_regressor.fit(X_train, y_train)
     ```

   - **Evaluate the Random Forest Regressor:**

     ```python
     y_pred_rf = rf_regressor.predict(X_test)
     mse_rf = mean_squared_error(y_test, y_pred_rf)
     mae_rf = mean_absolute_error(y_test, y_pred_rf)
     r2_rf = r2_score(y_test, y_pred_rf)
     print(f"Random Forest Regressor - Mean Squared Error: {mse_rf}")
     print(f"Random Forest Regressor - Mean Absolute Error: {mae_rf}")
     print(f"Random Forest Regressor - R^2 Score: {r2_rf}")
     ```

   - **Train the Gradient Boosting Regressor:**

     ```python
     gb = GradientBoostingRegressor(random_state=9214)
     gb.fit(X_train, y_train)
     ```

   - **Evaluate the Gradient Boosting Regressor:**

     ```python
     y_pred_gb = gb.predict(X_test)
     mse_gb = mean_squared_error(y_test, y_pred_gb)
     mae_gb = mean_absolute_error(y_test, y_pred_gb)
     r2_gb = r2_score(y_test, y_pred_gb)
     print(f"Gradient Boosting Regressor - Mean Squared Error: {mse_gb}")
     print(f"Gradient Boosting Regressor - Mean Absolute Error: {mae_gb}")
     print(f"Gradient Boosting Regressor - R^2 Score: {r2_gb}")
     ```

   - **Train the Random Forest Classifier:**

     - Convert the target variable to a classification problem (e.g., categorize prices into bins):
       ```python
       df['price_category'] = pd.qcut(df['price (€)'], q=4, labels=False)
       y_class = df['price_category']
       X_train_class, X_test_class, y_train_class, y_test_class = train_test_split(X, y_class, test_size=0.2, random_state=9214)
       rf_classifier = RandomForestClassifier(random_state=9214)
       rf_classifier.fit(X_train_class, y_train_class)
       ```

   - **Evaluate the Random Forest Classifier:**
     ```python
     y_pred_class = rf_classifier.predict(X_test_class)
     accuracy = accuracy_score(y_test_class, y_pred_class)
     precision = precision_score(y_test_class, y_pred_class, average='weighted')
     recall = recall_score(y_test_class, y_pred_class, average='weighted')
     f1 = f1_score(y_test_class, y_pred_class, average='weighted')
     print(f"Random Forest Classifier - Accuracy: {accuracy}")
     print(f"Random Forest Classifier - Precision: {precision}")
     print(f"Random Forest Classifier - Recall: {recall}")
     print(f"Random Forest Classifier - F1 Score: {f1}")
     ```

   d. **Hyperparameter Tuning for Gradient Boosting Regressor:**

   - **Define Parameter Grid:**

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

   - **Perform Grid Search:**

     ```python
     grid_search = GridSearchCV(gb, param_grid, cv=3, n_jobs=-1, verbose=2, scoring='neg_mean_squared_error')
     grid_search.fit(X_train, y_train)
     ```

   - **Train Best Model:**

     ```python
     best_gb = GradientBoostingRegressor(**grid_search.best_params_, random_state=9214)
     best_gb.fit(X_train, y_train)
     ```

   - **Evaluate the Best Gradient Boosting Regressor:**
     ```python
     y_pred_best_gb = best_gb.predict(X_test)
     mse_best_gb = mean_squared_error(y_test, y_pred_best_gb)
     mae_best_gb = mean_absolute_error(y_test, y_pred_best_gb)
     r2_best_gb = r2_score(y_test, y_pred_best_gb)
     print(f"Best Gradient Boosting Regressor - Mean Squared Error: {mse_best_gb}")
     print(f"Best Gradient Boosting Regressor - Mean Absolute Error: {mae_best_gb}")
     print(f"Best Gradient Boosting Regressor - R^2 Score: {r2_best_gb}")
     ```

### 3. Using the Model for Prediction

After training, use the model for predictions as follows:

1. Prepare your input data in the same format as `X_test`.

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
