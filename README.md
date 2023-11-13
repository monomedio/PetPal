# PetPal - Modern Pet Adoption Site

<img width="1432" alt="image" src="https://github.com/monomedio/PetPal/assets/94577880/57389e99-d08f-4bc2-bc33-aa9293b069fc">

## Project Overview

PetPal is a modern web solution to connecting pet seekers with animal shelters nearby. It was created with ReactJS, Django, and the Bootstrap framework. Created by Anisha, Anne, Celina, and Sam for CSC309 at the University of Toronto.

## Hi-Fidelity Prototype

View the interactive mockup on [Figma](https://www.figma.com/file/ZKIdWAghaEeyAz2GkyuE6M/PetPal-Prototype?type=design&node-id=33%3A2&mode=design&t=0D3J9f4paZh4kcy2-1).

## File Structure

How files and folders are organized somewhat follow the "intermediate" section shown on [this website](https://blog.webdevsimplified.com/2022-07/react-folder-structure/).

## CSS Defaults

Some default settings for CSS have been added following [this guide](https://www.joshwcomeau.com/css/custom-css-reset/) to hopefully make CSS and your life easier.

## Helpful Commands

# Activate virtual environment
source venv/bin/activate 
# Start new app (in outer petpal folder with venv activated)
python3 ./manage.py startapp pets
# Install package requirments (in outer petpal folder)
pip3 install -r requirements.txt
# Commit model changes to database (in outer petpal folder)
python3 ./manage.py makemigrations
# Push model changes to database (in outer petpal folder)
python3 ./manage.py migrate
# Run server (AFTER migrations are applied)
python3 ./manage.py runserver
# View database schemas (in outer petpal folder)
python3 ./manage.py dbshell
.schema accounts_user
.quit