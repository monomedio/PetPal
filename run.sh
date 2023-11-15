#!/bin/bash
# This shell script is assumed to be run in the Django project directory

source ./venv/bin/activate
python ./manage.py runserver
