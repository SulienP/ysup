import hashlib
import random
from faker import Faker
from datetime import datetime


fake = Faker()

with open('uuid.txt', 'r') as fichier:
    lignes_uuid = fichier.readlines()
with open('title.txt', 'r') as fichier:
    lignes_title = fichier.readlines()    
test = [6,6,6,3,1,2,6,6,6,3,1,2,6,6,6,3]
date_debut = datetime(2021, 1, 1)
date_fin = datetime(2024, 1, 11)

for i in range(14):
        idTicket = i+1
        title = lignes_title[i].strip()
        content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        idTagTicket = test[i]
        file=''
        status=random.randint(1,2)
        dates=fake.date_between_dates(date_start=date_debut, date_end=date_fin)
        idUser=lignes_uuid[i].strip()

        print(f"('{idTicket}', '{title}', '{content}', '{idTagTicket}', '{file}', '{status}', '{dates}', '{idUser}'),")