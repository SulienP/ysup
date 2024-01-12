import hashlib
from faker import Faker
import random

fake = Faker()

with open('uuid.txt', 'r') as fichier:
    lignes_uuid = fichier.readlines()



    for i in range(50):
        idRelationGroup=i+1
        idUser = lignes_uuid[i].strip()
        groupId=random.randint(1,6)

        print(f"('{idRelationGroup}', '{idUser}', '{groupId}'),")

