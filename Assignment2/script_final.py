# %% [markdown]
# <h1>Import Library</h1>

# %%
# import library
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from datetime import datetime
from sklearn.preprocessing import OneHotEncoder, MinMaxScaler
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor, RandomForestClassifier
import statsmodels.api as sm
from sklearn.model_selection import cross_val_score, GridSearchCV, RandomizedSearchCV
from sklearn.metrics import confusion_matrix, accuracy_score, precision_score, recall_score, f1_score, make_scorer
from sklearn.cluster import KMeans


# %% [markdown]
# <h1>Load Dataset</h1>

# %%
# load the csv file
df = pd.read_csv('German Air Fares.csv')
print(df.head(5))

# %% [markdown]
# <h1>Data Preparation</h1>
# <h3>EDA phase</h3>
# <p>implement EDA phase before data processing to understand the general structure of the dataset</p>

# %%
# descriptive statistic
print("\n Dataset shape: ", df.shape)
print("\n Column Type: \n", df.dtypes)
print("\nSummary statistics:\n",df.describe())

# %%
# data quality assesment
print("\nMissing value:\n", df.isnull().sum())
print("\nDuplicate rows:", df.duplicated().sum())
print("\nUnique value in each column:")
for col in df.columns:
    print(col, ":", df[col].nunique())

# %%
#analyze categorical variables:
categorical_cols = df.select_dtypes(include=['object']).columns
for col in categorical_cols:    
    print(f"\nValue counts for {col}:")  # print the name of the column
    print(df[col].value_counts())  # print the value counts for each category


# %% [markdown]
# <h3>Data Preprocessing </h3>
# <p>Data Cleaning and Data Transformation </p>

# %%
# clean data
# drop the null value ( decide to remove the row because the dataset actually has only one row with null value and this row only have price column, remaining columns are null)
df = df.dropna()

# total rows before removing duplicates
print("\nTotal rows before removing duplicates: ", df.shape[0])
  
#remove the exact duplicate rows
df = df.drop_duplicates()

# total rows after removing duplicates
print("\nTotal rows after removing duplicates: ", df.shape[0])

#strip whitespace from string column 
object_column = df.select_dtypes(include="object").columns
df[object_column] = df[object_column].apply(lambda x: x.str.strip())

#convert price column to float
df["price (€)"] = df["price (€)"].str.replace(",", "").str.replace("€", "").str.strip()  # remove the comma in some prices to make sure data is consistent
df["price (€)"] = df["price (€)"].astype(float)
df.rename(columns={'price (€)': 'price'}, inplace=True)  # rename the column for better readability

# convert date columns to datetime
df["departure_date"] = pd.to_datetime(df["departure_date"], format='%d.%m.%Y')
df['scrape_date'] = pd.to_datetime(df["scrape_date"], format='%d.%m.%Y')

# convert the stops column to numerical value
df["stops"] = df["stops"].replace("direct", 0)
df["stops"] = df["stops"].replace("(1 Stopp)", 1)
df["stops"] = df["stops"].replace("(1 stop)", 1)
df["stops"] = df["stops"].replace("(2 Stopps)", 2)

# convert the arrival and departure time to same format  (consistently in 24 hour format)
def standardize_time(time_str: str) -> str:
    # remove leading/trailing whitespace
    time_str = time_str.strip().lower()
    try:
    # handle 'am' or 'pm' format to 12 hour format (convert to datetime datatype)
        if 'am' in time_str or 'pm' in time_str:
            time_obj = datetime.strptime(time_str, '%I:%M%p')
        #handle 'uhr'        
        elif 'uhr' in time_str:
            time_str = time_str.replace("uhr", "").strip()
            if ":" in time_str:
                time_obj = datetime.strptime(time_str, '%H:%M')
            else:
                time_obj = datetime.strptime(time_str, '%H')
        #handle 24-hour format
        else:
            if ":" in time_str:
                time_obj = datetime.strptime(time_str, '%H:%M')   
            else:
                time_obj = datetime.strptime(time_str, '%H')
        #convert to 24 hour format
        return time_obj.strftime('%H:%M')
    except ValueError: 
        print(f"Unable to parse time: {time_str}")
        return None
#apply convert for arrival_time and departure time to standardize format
df["arrival_time"] = df["arrival_time"].apply(standardize_time)
df["departure_time"] = df["departure_time"].apply(standardize_time)

#convert arrival_time and departure_time to datetime datatype
df["arrival_time"] = pd.to_datetime(df["arrival_time"], format='%H:%M').dt.time
df["departure_time"] = pd.to_datetime(df["departure_time"], format='%H:%M').dt.time

# convert the departure_date_distance format to day format (how long)  // def: departure_date_distance: How far in advance the flight was booked
def convert_number_date_distance(time_str: str) -> int:
    time_str = time_str.strip().lower().split(" ")
    if "day" in time_str:
        return int(time_str[0])
    elif "week" in time_str or "weeks" in time_str:
        return int(time_str[0]) * 7
    elif "month" in time_str or "months" in time_str:
        return int(time_str[0]) * 30
    elif "year" in time_str or "year" in time_str:
        return int(time_str[0]) * 365
    else:
        return None
df["departure_date_distance"] = df["departure_date_distance"].apply(convert_number_date_distance)

# %% [markdown]
# <p>Feature extraction</p>

# %%
# function to convert time to minutes
def times_to_minute (time_obj) -> int :
     return time_obj.hour * 60 + time_obj.minute  # convert time to minutes

#create a new column for flight duration in minutes
# condition for flight duration (if stops more than 1 so the duration cannot be lower than 150)
df["flight_duration_in_minutes"] = df["arrival_time"].apply(times_to_minute) - df["departure_time"].apply(times_to_minute)
df.loc[(df['flight_duration_in_minutes'] < 150) & (df['stops'] != 0), 'flight_duration_in_minutes'] = (1440 - df['departure_time'].apply(times_to_minute)) + df['arrival_time'].apply(times_to_minute)

# create departure_time_in_minutes_from_midnight      => the flight price is apparently affected by the departure_time
df["departure_time_in_minutes_from_midnight"] = df["departure_time"].apply(times_to_minute)

# create a new column for the day of the week of the departure date (day_number) (monday is 0, sunday is 6)
df["day_of_week"] = df["departure_date"].dt.weekday

#create a new column for the day of the month of the departure date (day_number)
df["day_of_month"] = df["departure_date"].dt.day

#create a new column for the month of the departure date (month_number)
df["month"] = df["departure_date"].dt.month

# create new column for the year of the departure date
df["year"] = df["departure_date"].dt.year

# create new column call 'price_category' to categorize the price into 3 categories: budget, moderate, expensive
df['price_category'] = pd.cut(df['price'], bins=[-float('inf'), 200, 500, float('inf')], labels=['budget', 'moderate', 'expensive'])  # categorize the price into 3 categories based on the price range (0-200: budget, 200-500: moderate, 500+: expensive)


# %% [markdown]
# <p>Drop unnessary column (feature)</p>

# %%
# drop the column that is obviously irrelevant
df.drop(columns=["scrape_date"], inplace=True, axis=1)  # this is just the data collection artifact

# drop the time stamp column
df.drop(columns=["departure_time", "arrival_time", "departure_date"], inplace=True, axis=1)  # already have the departure_time_in_minutes_from_midnight and durations

# drop the airline named 

# %%
df.info()

# %%
df.isnull().sum()  # double check whether drop successfull or not

# %%
df.describe()  

# %% [markdown]
# <p>Handle Outliers</p>

# %%
#detect outliers function by using IQR method 
def detect_outliers(df, cols) -> dict:
    outliers: dict = {}
    for col in cols:
        Q1 = df[col].quantile(0.25)  # 1st quartile
        Q3 = df[col].quantile(0.75)  # 3rd quartile
        IQR = Q3 - Q1  # interquartile range
        lower_bound = Q1 - 1.5 * IQR  # lower bound
        upper_bound = Q3 + 1.5 * IQR  # upper bound
        outliers[col] = df.loc[(df[col] < lower_bound) | (df[col] > upper_bound)].shape[0]  #count of outliers in each column (column: count of rows)
    return outliers

#boxplot to visualize outliers
def plot_boxplots(df, columns):
    fig, axes = plt.subplots(len(columns), 1, figsize=(10, 5*len(columns)))  # create subplots based on number of columns 
    for i, col in enumerate(columns):
        sns.boxplot(x=df[col], ax=axes[i])  # create boxplot for each column
        axes[i].set_title(f'Boxplot of {col}')  # set title for each boxplot
    plt.tight_layout()  # adjust the layout (automatically adjust the subplot parameters to give specified padding) 
    plt.show()

# Identify numerical columns (excluding date columns)
numerical_cols = df.select_dtypes(include=[np.number]).columns.tolist()  # get the list of numerical columns but exclude the 'price' column because it's the target
numerical_cols = [col for col in numerical_cols if 'price' not in col]  # exclude date columns

# Plot boxplots before outlier handling
print("Plotting boxplots before outlier handling...")
plot_boxplots(df, numerical_cols)

# Detect outliers
outliers = detect_outliers(df, numerical_cols)
print("Number of outliers in each column: ", outliers)
total_rows = len(df)  #total of rows before outlier handling
print(f"Total number of rows before outlier handling: {total_rows}")
    
# Handle outliers (here we'll use capping method). By setting the lower and upper bounds for each numerical column, if the value is below the 1st percentile or above the 99th percentile respectively, replace it with the corresponding bound. (lower bound for values below 1st percentile, upper bound for values above 99th percentile)
for col in numerical_cols:
    lower_bound = df[col].quantile(0.01)  # 1st percentile
    upper_bound = df[col].quantile(0.99)  # 99th percentile
    df[col] = df[col].clip(lower_bound, upper_bound)

# Plot boxplots after outlier handling
plot_boxplots(df, numerical_cols)


# Calculate and print the percentage of data retained after outlier handling
rows_after_outlier_handling = len(df)  #total of rows after outlier handling
print(f"Total number of rows after outlier handling: {rows_after_outlier_handling}")
percentage_retained = (rows_after_outlier_handling / total_rows) * 100  #calculate the percentage of data retained

print(f"Percentage of data retained after outlier handling: {percentage_retained:.2f}%")  

#the distribution of the 'price' column
plt.figure(figsize=(10, 6))  
sns.histplot(df['price'], kde=True)  # create a histogram of the 'price' column (with kernel density estimation)
plt.title('Distribution of Flight Prices After Outlier Handling')
plt.xlabel('Price')
plt.ylabel('Frequency')
plt.show()

# %%
df.info()

# %% [markdown]
# <h5>Data Analystic and Data Visualization</h5>

# %%
# The distribution of flight duration
plt.figure(figsize=(12, 8))
sns.boxplot(x=df['flight_duration_in_minutes'])
plt.title('Box Plot of Flight Duration')
plt.xlabel('Flight Duration (in minutes)')
plt.show()

# %%
# linear correlation between numerical attributes
# [col for col in df.columns if df[col].dtype=="int"]
correlation = df.select_dtypes(include=["int"]).corr()
color_map = sns.diverging_palette(260,-10,s=50, l=80, n=6, as_cmap=True)
plt.subplots(figsize=(17,17))
sns.heatmap(correlation,cmap= color_map,annot=True, square=True)

# %%
#distribution of the flight price
plt.figure(figsize=(10, 6))
sns.histplot(df['price'], kde=True)
plt.title('Distribution of Flight Prices')
plt.xlabel('Price')
plt.ylabel('Frequency')
plt.show()

# %%
# Box plot of prices by airline
plt.figure(figsize=(12, 6))
sns.boxplot(x='airline', y='price', data=df)
plt.title('Flight Prices by Airline')
plt.xticks(rotation=90)  #rotate the x-axis labels by 90 degrees and set the labels to the airline names
plt.show()

# %%
# Scatter plot of price vs. flight duration
plt.figure(figsize=(10, 6))
sns.scatterplot(x='flight_duration_in_minutes', y='price', data=df)
plt.title('Price vs. Flight Duration')
plt.xlabel('Flight Duration (minutes)')
plt.ylabel('Price')
plt.show()

# %%
# Analyze Airline vs Price
df.groupby('airline')['price'].mean().sort_values(ascending=False).plot(kind='bar', figsize=(12, 6))

# %%
# average price by year
df.groupby('year')['price'].mean().plot(kind='bar', figsize=(12, 6))


# %%
# Price Trends Over Time
monthly_avg_price = df.groupby('month')['price'].mean().reset_index()
plt.figure(figsize=(10, 6))
sns.lineplot(x='month', y='price', data=monthly_avg_price)
plt.title('Average Price Trend by Month')
plt.xlabel('Month')
plt.ylabel('Average Price')
plt.show()

# %%
# How many flights are there for each day of the week?
plt.figure(figsize=(10, 6))
sns.countplot(x='day_of_week', data=df)
plt.title('Number of Flights by Day of the Week')
plt.xlabel('Day of the Week')
plt.ylabel('Number of Flights')
plt.show()


# %%
# day of the week vs price (monday is 0, sunday is 6)
day_of_the_week_avg_price = df.groupby('day_of_week')['price'].mean().reset_index()
plt.figure(figsize=(10, 6))
sns.barplot(x='day_of_week', y='price', data=day_of_the_week_avg_price)
plt.title('Average Price by Day of the Week')
plt.xlabel('Day of the Week')
plt.ylabel('Average Price')
plt.show()


# %%
# Analyze the average price by departure city and arrival city
cities: list[str] = ['departure_city', 'arrival_city']
fig, axes = plt.subplots(2,1,figsize=(20, 10))
for i, city in enumerate(cities):
    avg_prices = df.groupby(city)['price'].mean().sort_values(ascending=False)
    avg_prices.plot(kind='bar', ax=axes[i])
    axes[i].set_title(f'Average Price by {city}')
    axes[i].set_xlabel(city)
    axes[i].set_ylabel('Average Price')
    axes[i].tick_params(axis='x',rotation = 90)
plt.tight_layout()
plt.show()


# %%
#Price Distribution by Number of Stops
plt.figure(figsize=(10, 6))
sns.violinplot(x='stops', y='price', data=df)
plt.title('Price Distribution by Number of Stops')
plt.xlabel('Number of Stops')
plt.ylabel('Price')
plt.show()

# %%
#Price vs Days Before Flight
plt.figure(figsize=(12, 6))
sns.scatterplot(x='departure_date_distance', y='price', data=df)
plt.title('Price vs Departure Date Distance')
plt.xlabel('Departure Date Distance')
plt.ylabel('Price')
plt.show()

# %%
# the departure_city vs price
plt.figure(figsize=(15,10))
plt.xticks(rotation=90)
sns.boxplot(x='departure_city', y='price', data=df.sort_values('price', ascending=False))

# %%
# arrival_city vs price
plt.figure(figsize=(15,10))
plt.xticks(rotation=90)
sns.boxplot(x='arrival_city', y='price', data=df.sort_values('price', ascending=False))

# %%
#Pair Plot for Key Features
key_features = ['price', 'flight_duration_in_minutes', 'stops', 'departure_time_in_minutes_from_midnight', 'day_of_month', 'month', 'day_of_week', 'year', 'departure_date_distance']
sns.pairplot(df[key_features], height=2.5)
plt.tight_layout()
plt.show()

# %%
# Bar plot of price categories
plt.figure(figsize=(8, 6))
sns.countplot(x='price_category', data=df)
plt.title('Distribution of Price Categories')
plt.xlabel('Price Category')
plt.ylabel('Count')
plt.show()

# %%
#Flight Duration Distribution by Price Category
plt.figure(figsize=(10, 6))
sns.boxplot(x='price_category', y='flight_duration_in_minutes', data=df)
plt.title('Flight Duration Distribution by Price Category')
plt.xlabel('Price Category')
plt.ylabel('Flight Duration (in minutes)')
plt.show()

# %%
#Statistical Summary
summary = df.describe()
print("Statistical Summary of Numerical Features:")
print(summary)

# %% [markdown]
# <p>Split the data</p>

# %%
# Separate features and target
X = df.drop(columns=['price', 'price_category'], axis=1)  # enforce exclusive the target variable
y =df['price']  # target variable for regression
z = df['price_category']  # target variable for classification

# split the data for regression model
X_train_rg, X_test_rg, y_train_rg, y_test_rg = train_test_split(X, y, test_size=0.20, random_state=9214)
# split the data for classification model
X_train_cl, X_test_cl, z_train_cl, z_test_cl = train_test_split(X, z, test_size=0.20, random_state=9214)

# %% [markdown]
# <p>Scaling numerical data and Encode categorical data</p>

# %%
#visualize the distribution of numerical column to choose the best scaling method 
categorical_cols: list[str] = ['departure_city', 'arrival_city', 'airline']
numerical_cols: list[str] = [col for col in X.columns if col not in categorical_cols]  # get the list of numerical columns
for col in numerical_cols:
    plt.figure(figsize=(10, 12))
    df[col].value_counts().plot(kind='hist')  # count the unique values in each column and visualize it in bar chart
    plt.title(f'Histogram of {col}')
    plt.xticks(rotation=45)  #rotate 45 deg the label in xaxis for better reading
    plt.show()  #show the plot

# %%
# Scale numerical variables
# # After analyzing the distribution of the selected numerical columns, we can see that the values are not normally distributed. Therefore, we will use the MinMaxScaler to normalize the numerical columns.
scaler = MinMaxScaler()
X_train_scaled_rg = pd.DataFrame(scaler.fit_transform(X_train_rg[numerical_cols]),
                              columns=numerical_cols,
                              index=X_train_rg.index)
X_test_scaled_rg = pd.DataFrame(scaler.transform(X_test_rg[numerical_cols]),
                             columns=numerical_cols,
                             index=X_test_rg.index)

X_train_scaled_cl = pd.DataFrame(scaler.fit_transform(X_train_cl[numerical_cols]),
                              columns=numerical_cols,
                              index=X_train_cl.index)
X_test_scaled_cl = pd.DataFrame(scaler.transform(X_test_cl[numerical_cols]),
                             columns=numerical_cols,
                             index=X_test_cl.index)

#One-hot encode categorical variables
encoder = OneHotEncoder(drop='first', sparse_output=False, handle_unknown='ignore')

# for regression model
X_train_encoded_rg = pd.DataFrame(encoder.fit_transform(X_train_rg[categorical_cols]),
                               columns=encoder.get_feature_names_out(categorical_cols),
                               index=X_train_rg.index)
X_test_encoded_rg = pd.DataFrame(encoder.transform(X_test_rg[categorical_cols]),
                              columns=encoder.get_feature_names_out(categorical_cols),
                              index=X_test_rg.index)

# for classification model
X_train_encoded_cl = pd.DataFrame(encoder.fit_transform(X_train_cl[categorical_cols]),
                                  columns=encoder.get_feature_names_out(categorical_cols),
                                  index=X_train_cl.index)
X_test_encoded_cl = pd.DataFrame(encoder.transform(X_test_cl[categorical_cols]),
                              columns=encoder.get_feature_names_out(categorical_cols),
                              index=X_test_cl.index)



# Combine encoded categorical and scaled numerical variables
X_train_preprocessed_rg = pd.concat([X_train_encoded_rg, X_train_scaled_rg], axis=1)
X_test_preprocessed_rg = pd.concat([X_test_encoded_rg, X_test_scaled_rg], axis=1)

X_train_preprocessed_cl = pd.concat([X_train_encoded_cl, X_train_scaled_cl], axis=1)
X_test_preprocessed_cl = pd.concat([X_test_encoded_cl, X_test_scaled_cl], axis=1)

# %% [markdown]
# <p>Feature Selection for Regression Model</p>

# %%
# Function to calculate p-values and perform stepwise regression
def stepwise_regression(X, y, significance_level_in=0.05, significance_level_out=0.05) -> list:
    # Start with no features
    included: list[str] = []
    
    while True:
        changed = False
        
        # Forward Selection: Add the feature that improves the model the most (lowest p-value)
        excluded = list(set(X.columns) - set(included))
        new_pval = pd.Series(index=excluded)
        for new_column in excluded:
            model = sm.OLS(y, sm.add_constant(X[included + [new_column]])).fit()
            new_pval[new_column] = model.pvalues[new_column]
        best_pval = new_pval.min()
        
        if best_pval < significance_level_in:
            best_feature = new_pval.idxmin()
            included.append(best_feature)
            changed = True
            print(f"Adding feature '{best_feature}' with p-value {best_pval:.4f}")
        
        # Backward Elimination: Remove features that are no longer significant
        model = sm.OLS(y, sm.add_constant(X[included])).fit()
        pvalues = model.pvalues.iloc[1:]  # Exclude constant
        worst_pval = pvalues.max()
        
        if worst_pval > significance_level_out:
            worst_feature = pvalues.idxmax()
            included.remove(worst_feature)
            changed = True
            print(f"Removing feature '{worst_feature}' with p-value {worst_pval:.4f}")
        
        if not changed:
            break
    
    return included

# Add a constant term to the features (required for statsmodels OLS)
X_train_with_const_rg = sm.add_constant(X_train_preprocessed_rg)

# Perform stepwise regression
final_features_rg = stepwise_regression(X_train_preprocessed_rg, y_train_rg)

# Print final features after stepwise regression
print("\nFinal features after stepwise regression:")
print(final_features_rg)

# Prepare final datasets for modeling
X_train_final_rg = X_train_preprocessed_rg[final_features_rg]
X_test_final_rg = X_test_preprocessed_rg[final_features_rg]

# Final data frame for regression
df_regression = pd.concat([pd.concat([X_train_final_rg, y_train_rg], axis=1), pd.concat([X_test_final_rg, y_test_rg], axis=1)], axis=0)

# %%
df_regression.head(5)

# %% [markdown]
# <p>Feature Selection for Classification Model</p>

# %%
#  We can modify our approach to use a technique called "elbow method" to automatically select the number of features. This method looks at the cumulative importance of features and selects a point where adding more features doesn't significantly increase the total importance.
def feature_selection_ramdomforestclassifier(X, y) -> list:
    # Initialize and fit the Random Forest Classifier
    rf = RandomForestClassifier(n_estimators=100, random_state=42)
    rf.fit(X, y)
    
    # Get feature importances
    importances = rf.feature_importances_
    
    # Sort features by importance
    feature_importances = pd.DataFrame({'feature': X.columns, 'importance': importances})
    feature_importances = feature_importances.sort_values('importance', ascending=False)
    
    # Calculate cumulative importances
    cumulative_importances = np.cumsum(feature_importances['importance'])
    
    # Find the elbow point
    diff = np.diff(cumulative_importances)
    elbow = np.argmin(diff) + 1  # Add 1 because diff reduces the array size by 1
    
    # Select features up to the elbow point
    selected_features = feature_importances['feature'][:elbow].tolist()
    
    print(f"\nAutomatically selected {len(selected_features)} features:")
    print(feature_importances.head(elbow))
    
    # Plot cumulative importances
    plt.figure(figsize=(10, 6))
    plt.plot(range(1, len(cumulative_importances) + 1), cumulative_importances, 'b-')
    plt.xlabel('Number of Features')
    plt.ylabel('Cumulative Importance')
    plt.title('Cumulative Feature Importance')
    plt.axvline(x=elbow, color='r', linestyle='--', label='Elbow point')
    plt.legend()
    plt.show()
    
    return selected_features

# X_train_preprocessed_cl and z_train_cl are preprocessed features and target variable
selected_features = feature_selection_ramdomforestclassifier(X_train_preprocessed_cl, z_train_cl)

# Prepare final datasets for classification modeling
X_train_final_cl = X_train_preprocessed_cl[selected_features]
X_test_final_cl = X_test_preprocessed_cl[selected_features]

# Final data frame for regression
df_classification = pd.concat([pd.concat([X_train_final_cl, z_train_cl], axis=1), pd.concat([X_test_final_cl, z_test_cl], axis=1)], axis=0)

# %% [markdown]
# <h1>Model Selection</h1>

# %%
# function to call the model with numeric scorer (evaluation metric)
def model_train(model_name, X_train, X_test, y_train, y_test):
    print(f" Regression Model: {model_name}")
    model = model_name.fit(X_train, y_train)  #fit the training data into model
    print(f"Training Score: {model.score(X_train, y_train)}")  #print training score
    print(f"Test Score: {model.score(X_test, y_test)}")  #print test score
    predict_value = model.predict(X_test)  #predict the result of the test set
    print(f"R^2 Score: {r2_score(y_test, predict_value)}")
    print(f"Mean Square Error: {mean_squared_error(y_test, predict_value)}")
    print(f"Mean Absolute Error: {mean_absolute_error(y_test, predict_value)}")


# %%
# function to call the classification model (evaluation metric)
def model_train_classification(model_name, X_train, X_test, y_train, y_test):
    print(f"Classification Model: {model_name}")
    model = model_name.fit(X_train, y_train)  # fit the training data into model
    predict_value = model.predict(X_test)  # predict the result of the test set
    print(f"Accuracy: {accuracy_score(y_test, predict_value)}")
    print(f"Precision: {precision_score(y_test, predict_value, average='weighted')}")
    print(f"Recall: {recall_score(y_test, predict_value, average='weighted')}")
    print(f"F1 Score: {f1_score(y_test, predict_value, average='weighted')}")
    print(f"Confusion Matrix:\n{confusion_matrix(y_test, predict_value)}")

# %%
# Random Forest (for predict numerical value)
model1 = RandomForestRegressor(random_state=9214)
model_train(model1, X_train_final_rg, X_test_final_rg, y_train_rg, y_test_rg)

# %%
# Gradient Boosting Regressor
model2 = GradientBoostingRegressor(random_state=9214)
model_train(model2, X_train_final_rg, X_test_final_rg, y_train_rg, y_test_rg)  

# %%
# Random Forest Classifier
model3 = RandomForestClassifier(random_state=9214)
model_train_classification(model3, X_train_final_cl, X_test_final_cl, z_train_cl, z_test_cl)

# %%
kmeans = KMeans(n_clusters=3, random_state=42)  # adjust number of clusters as needed
df['cluster'] = kmeans.fit_predict()

# %% [markdown]
# <p>Validation</p>

# %%
# the data use to train the regression model also use to validation (should be the whole data not the splitted data because will use kfold to valid the model)
X_cross_val_rg = df_regression.drop(columns=['price'], axis=1)
y_cross_val_rg = df_regression['price']

# %%
#validation for the regression model
models = [model1, model2]  #list of models
for i, model in enumerate(models, start=1):
    cv_scores = cross_val_score(model, X_cross_val_rg, y_cross_val_rg, cv=5)  # 5-fold cross-validation

    print(f"Model {i} Cross-validation scores: {cv_scores}")
    print(f"Model {i} Mean CV score: {cv_scores.mean():.4f}")
    print(f"Model {i} Standard deviation of CV score: {cv_scores.std():.4f}")

# %%
# the data use to train the classification model also use to validation (should be the whole data not the splitted data because will use kfold to valid the model)
X_cross_val_cl = df_classification.drop(columns=['price_category'], axis=1)
y_cross_val_cl = df_classification['price_category']

# %%
# validation for the classification model
models = [model3] #list of models

# Define the metrics you want to use
metrics = {
    'Accuracy': accuracy_score,
    'Precision': lambda y_true, y_pred: precision_score(y_true, y_pred, average='weighted'),
    'Recall': lambda y_true, y_pred: recall_score(y_true, y_pred, average='weighted'),
    'F1 Score': lambda y_true, y_pred: f1_score(y_true, y_pred, average='weighted')
}

# Perform cross-validation for each model
for i, model in enumerate(models, 1):
    print(f"\nModel {i}:")
    for metric_name, metric_func in metrics.items():
        scores = cross_val_score(model, X_cross_val_cl, y_cross_val_cl, cv=5, scoring=make_scorer(metric_func))
        print(f"{metric_name}:")
        print(f"  Scores: {scores}")
        print(f"  Mean: {scores.mean():.4f}")
        print(f"  Std. Dev: {scores.std():.4f}")

# %% [markdown]
# <h1>Hyperparameter tunning</h1>

# %% [markdown]
# <h5>Random Forest Regression model </h5>

# %%
# Define the parameter grid
param_grid = {
    'n_estimators': [500, 600],         # Keep high number of trees
    'max_depth': [35, 40],              # Slightly shallower trees to reduce overfitting
    'min_samples_split': [15, 20],      # Tighten split to control overfitting
    'min_samples_leaf': [3, 4],         # Increase min_samples_leaf for stability
    'max_features': ['sqrt'],           # Keep 'sqrt' as it worked well
    'bootstrap': [True] 
}

# Define a custom scoring function that penalizes overfitting
def custom_score(estimator, X, y):
    # Get cross-validation score
    cv_score = np.mean(cross_val_score(estimator, X, y, cv=5, scoring='neg_mean_squared_error'))
    
    # Fit the estimator and get training score
    estimator.fit(X, y)
    train_score = -mean_squared_error(y, estimator.predict(X))
    
    # Penalize the difference between train and cv scores
    penalty = abs(train_score - cv_score)
    
    return cv_score - penalty 

# Create a random forest regressor
rf = RandomForestRegressor(random_state=9214)

# Set up the Grid search
ran_search = RandomizedSearchCV(
    estimator=rf,
    param_distributions=param_grid,
    n_iter=5,
    cv=3,
    n_jobs=-1,
    verbose=2,
    scoring=custom_score
)

# Fit the Grid search
ran_search.fit(X_train_final_rg, y_train_rg)

# Print the best parameters and score
print("Best parameters:", ran_search.best_params_)
print("Best score:", ran_search.best_score_)

# %%

# Create a new model with the best parameters
best_rf = RandomForestRegressor(**ran_search.best_params_, random_state=9214)

# Fit the model to the training data
best_rf.fit(X_train_final_rg, y_train_rg)

# Make predictions on the test set
y_pred = best_rf.predict(X_test_final_rg)

# Calculate MSE and R^2 score
mse = mean_squared_error(y_test_rg, y_pred)
r2 = r2_score(y_test_rg, y_pred)
mbe = mean_absolute_error(y_test_rg, y_pred)

print(f"Mean Squared Error: {mse}")
print(f"Mean Absolute Error: {mbe}")
print(f"R^2 Score: {r2}")

# %%
# Print feature importances
for feature, importance in zip(X_cross_val_rg.columns, best_rf.feature_importances_):
    print(f"{feature}: {importance}")

# %%
print(f"Training Score: {best_rf.score(X_train_final_rg, y_train_rg)}")  # print training score

# %%
cv_val = cross_val_score(best_rf, X_cross_val_rg, y_cross_val_rg, cv=5, scoring='r2')
print(f"Cross-validation scores: {cv_val}")
print(f" Mean CV score: {cv_val.mean():.4f}")
print(f"Standard deviation of CV score: {cv_val.std():.4f}")

# %% [markdown]
# <h5>Gradient Boosting Regressor model</h5>

# %%
# Define the parameter grid
param_grid = {
    'n_estimators': [100, 200],           
    'learning_rate': [0.05, 0.1],         
    'max_depth': [3, 4],                  
    'min_samples_split': [5, 10],         
    'min_samples_leaf': [2, 4],           
    'subsample': [0.8],                   
    'max_features': ['sqrt', None]      
}

# Define a custom scoring function that penalizes overfitting
def custom_score(estimator, X, y):
    # Get cross-validation score
    cv_score = np.mean(cross_val_score(estimator, X, y, cv=5, scoring='neg_mean_squared_error'))
    
    # Fit the estimator and get training score
    estimator.fit(X, y)
    train_score = -mean_squared_error(y, estimator.predict(X))
    
    # Penalize the difference between train and cv scores
    penalty = abs(train_score - cv_score)
    
    return cv_score - penalty  # We want to maximize this

# Create a random forest regressor
gb = GradientBoostingRegressor(random_state=9214)

# Set up the Grid search
grid_search = GridSearchCV(
    estimator=gb,
    param_grid=param_grid,
    cv=3,
    n_jobs=-1,
    verbose=2,
    scoring=custom_score
)

# Fit the Grid search
grid_search.fit(X_train_final_rg, y_train_rg)

# Print the best parameters and score
print("Best parameters:", grid_search.best_params_)
print("Best score:", grid_search.best_score_)

# %%

# Create a new model with the best parameters
best_gb = GradientBoostingRegressor(**grid_search.best_params_, random_state=9214)

# Fit the model to the training data
best_gb.fit(X_train_final_rg, y_train_rg)

# Make predictions on the test set
y_pred = best_gb.predict(X_test_final_rg)

# Calculate MSE and R^2 score
mse = mean_squared_error(y_test_rg, y_pred)
r2 = r2_score(y_test_rg, y_pred)
mbe = mean_absolute_error(y_test_rg, y_pred)

print(f"Mean Squared Error: {mse}")
print(f"Mean Absolute Error: {mbe}")
print(f"R^2 Score: {r2}")
print(f"Training Score: {best_gb.score(X_train_final_rg, y_train_rg)}")

# %%
cv_val = cross_val_score(best_gb, X_cross_val_rg, y_cross_val_rg, cv=5, scoring='r2')
print(f"Cross-validation scores: {cv_val}")
print(f" Mean CV score: {cv_val.mean():.4f}")
print(f"Standard deviation of CV score: {cv_val.std():.4f}")

# %%



