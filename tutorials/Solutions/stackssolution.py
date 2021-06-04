paragraph = []
storage = []
splitwords = []

paragraph = input("Enter what you want to say : ")
print(paragraph)
splitwords = paragraph.split()

def beginning():
    paragraph2 = input("Enter what you want to add : ")
    global splitwords
    paragraph2 = paragraph.split()
    splitwords += paragraph2
    print(splitwords)
    choices()
def choices():
    print ("2 Exit \n 3 Undo \n 4 Redo")
    choice = int(input("Do you like your choice? \n To type more enter (1) \n If you do like what you have enter (2) to exit \n If not would you like to use (3) undo or (4) redo?: "))
    if choice == 1:
        beginning()
    if choice == 2:
        exit()
    if choice == 3:
        undo()
    if choice == 4:
        redo()
def undo():
    print(splitwords)
    undoing = splitwords.pop()
    storage.append(undoing)
    print(splitwords)
    choices()
def redo():
    if len(storage) > 0:
        take = storage.pop()
        splitwords.append(take)
        print(splitwords)
        choices()
    else:
        print("Your list is empty")
        understand = input("do you understand?")
        choices()

choices()