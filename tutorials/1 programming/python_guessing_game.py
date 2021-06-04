import random
MAX_NUM = 100

number = random.randint(0,MAX_NUM)
guess = int(input(f"What's the number? Guess a number from 1 to {MAX_NUM}: "))

while guess is not number:
    
    if guess < number:
      print("Too low!")
    
    elif guess > number:
      print("Too high!")
    
    guess = int(input(f"What's the number? Guess a number from 1 to {MAX_NUM}: "))

print("You win!")