import hashlib
from faker import Faker

fake = Faker()

with open('uuid.txt', 'r') as fichier:
    lignes_uuid = fichier.readlines()



    for i in range(50):
        idUser = lignes_uuid[i].strip()
        firstname = fake.first_name()
        lastname = fake.last_name()
        password_hash = "XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg="
        image_path = f'https://picsum.photos/200' 
        email = lastname+firstname+"@gmail.com"

        print(f"('{idUser}', '{firstname}', '{lastname}', '{password_hash}', '{image_path}', '{email}'),")












































