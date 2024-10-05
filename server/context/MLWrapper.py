import pickle
from typing_extensions import Annotated, Doc
from sklearn.base import RegressorMixin


def __import_model__(path: Annotated[str, Doc("The path to the model")]) -> RegressorMixin:
    """
    Import a regressor model from a pickle file.

    Args:
        path (str): The path to the model.

    Returns:
        RegressorMixin: The model.
    """
    with open(path, "rb") as f:
        return pickle.load(f)


def __import_gb_model__():
    return __import_model__("models/gb_model.pkl")


def __import_rf_model__():
    return __import_model__("models/rf_model.pkl")
