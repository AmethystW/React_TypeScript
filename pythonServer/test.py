import os

directory = './uploads'
for root, dirs, files in os.walk(directory):
    filelist=files
print(filelist)
for i in range(0, len(filelist)):
    print(filelist[i])