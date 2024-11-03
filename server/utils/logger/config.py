"""
- File: config.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Configuration for application logging
"""

import logging

# Configure basic logging settings
logging.basicConfig(
    level=logging.DEBUG,  # Set minimum logging level
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",  # Log message format
    datefmt="%Y-%m-%d %H:%M:%S",  # Timestamp format
)

# Create singleton logger instance
__loggerSingleton__ = logging.getLogger(__name__)
