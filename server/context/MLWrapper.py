"""
- File: MLWrapper.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Wrapper for loading and managing machine learning models
"""

import pickle
from typing_extensions import Annotated, Doc
from sklearn.base import RegressorMixin


def __import_model__(path: Annotated[str, Doc("The path to the model")]) -> RegressorMixin:
    """
    Import a regressor model from a pickle file.

    Args:
        path: Path to the pickled model file

    Returns:
        RegressorMixin: The loaded scikit-learn regressor model
    """
    with open(path, "rb") as f:
        return pickle.load(f)


def __import_gb_model__():
    """Load the gradient boosting model"""
    return __import_model__("models/gb_model.pkl")


def __import_rf_model__():
    """Load the random forest model"""
    return __import_model__("models/rf_model.pkl")
