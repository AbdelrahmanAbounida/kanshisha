.PHONY: setup install test lint format clean run

# Variables
PYTHON = pdm run python
PDM = pdm

# Default target
all: setup install

# Setup the project
setup:
	$(PDM) init --non-interactive || true

# Install dependencies
install:
	$(PDM) install

# Run tests
test:
	$(PDM) run pytest

# Lint code
lint:
	$(PDM) run flake8
	$(PDM) run mypy .

# Format code
format:
	$(PDM) run black .
	$(PDM) run isort .

# Clean build artifacts
clean:
	rm -rf dist/
	rm -rf .pytest_cache/
	rm -rf .mypy_cache/
	rm -rf __pycache__/
	find . -name "*.pyc" -delete

# Run the application
run:
	$(PYTHON) -m my_project