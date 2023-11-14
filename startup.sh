#!/bin/bash

apt update
apt upgrade -y

# Backend dependencies
apt install -y sqlite3

# Install Python
apt install -y python3
apt install -y python-is-python3
apt install -y python3-pip
python3 -m pip install --user pipx
python3 -m pipx ensurepath
apt install -y python3.8-venv
export PATH=$PATH:/root/.local/bin
pipx install virtualenv

# Set up virtual environment
cd ./petpal
virtualenv venv
source ./venv/bin/activate
pip install -r requirements.txt

# Set up Django project
make
python manage.py makemigrations
python manage.py migrate

# LOAD MOCK DATA WHEN WE HAVE IT
# python manage.py loaddata mock.json


