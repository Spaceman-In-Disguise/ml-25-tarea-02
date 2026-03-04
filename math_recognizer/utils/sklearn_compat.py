import sys

from sklearn.base import BaseEstimator, TransformerMixin


class FlattenImage(BaseEstimator, TransformerMixin):
    def fit(self, X, y=None):
        return self

    def transform(self, X):
        return X.reshape(X.shape[0], -1)


def register_notebook_transformers() -> None:
    """Expose notebook-defined transformers on __main__ for joblib loading."""
    main_module = sys.modules.get("__main__")
    if main_module is not None and not hasattr(main_module, "FlattenImage"):
        setattr(main_module, "FlattenImage", FlattenImage)
