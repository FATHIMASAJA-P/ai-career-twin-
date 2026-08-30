import sqlite3

conn = sqlite3.connect("career_twin.db")
cursor = conn.cursor()

cursor.execute("SELECT id, name, email, password FROM users")

users = cursor.fetchall()

for user in users:
    print(user)

conn.close()