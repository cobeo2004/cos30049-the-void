# Flight Price Prediction Machine Learning Model

## Overview

This notebook demonstrates the process of building machine learning models to predict flight prices using German air fare data. We will explore and compare the performance of three different algorithms:

1. Random Forest Regressor
2. Gradient Boosting Regressor
3. Random Forest Classifier

## Goal

Our goal is to develop accurate models for predicting flight prices and gain insights into the factors that influence ticket costs in the German air travel market.

## Process

The notebook covers the following steps:

1. Data loading and exploration
2. Data preprocessing and feature engineering
3. Model training and evaluation
4. Hyperparameter tuning
5. Model comparison and interpretation

## Author

1. Ba Viet Anh (Henry) Nguyen
2. Xuan Tuan Minh Nguyen
3. Trong Dat Hoang

## How to run

### Activate `conda` environment:

- Simply execute the following command on the terminal or using the command `sh conda-config.sh` to automatically execute the conda configuration:

  ```bash
  # Create a new conda environment
  conda create -n cos30049_env python=3.10.9
  conda activate cos30049_env

  # Check current environment
  conda info --envs

  #Check current python version
  python --version
  ```

### Download `required dependencies`:

- To automatically download all of the dependencies used in this notebook, execute the following command:
  ```bash
  pip install -r requirements.txt
  ```
- Or to install the dependencies manually, runs the following commands:
  ```bash
  pip install numpy
  pip install matplotlib
  pip install pandas
  pip install scikit-learn
  pip install scipy
  pip install statsmodels
  pip install mlxtend
  pip install seaborn
  pip install scikit-optimize
  ```

### For `Python` (Not recommended):

- Navigate to the file `germanflightprice_predict.py`.
- Execute the following command to run the python script.
  ```bash
  python germanflightprice_predict.py
  ```

### For `Jupyer Notebook`

- Navigate to the file `germanflightprice_predict.ipynb`.
- Read carefully and execute each cells to display the required informations.
