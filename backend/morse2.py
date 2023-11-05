import re
from typing import List


def possibilities(word: str) -> List[str]:
    # Define a dictionary that maps Morse code signals to characters
    morse_codes = {
        '.-': 'A',
        '-...': 'B',
        '-.-.': 'C',
        '-..': 'D',
        '.': 'E',
        '..-.': 'F',
        '--.': 'G',
        '....': 'H',
        '..': 'I',
        '.---': 'J',
        '-.-': 'K',
        '.-..': 'L',
        '--': 'M',
        '-.': 'N',
        '---': 'O',
        '.--.': 'P',
        '--.-': 'Q',
        '.-.': 'R',
        '...': 'S',
        '-': 'T',
        '..-': 'U',
        '...-': 'V',
        '.--': 'W',
        '-..-': 'X',
        '-.--': 'Y',
        '--..': 'Z'
    }
    # narrow down based on length
    possible_items = {}
    for key in morse_codes.keys():
        if len(word) == len(key):
            possible_items[key] = morse_codes[key]
    # Compile a regular expression to match the unknown values
    pattern = f""
    for c in word:
        if c == '?':
            pattern = f"{pattern}."
        else:
            pattern = f"{pattern}\{c}"
    pattern = re.compile(pattern)
    possible_characters = []
    for k in possible_items.keys():
        x = re.fullmatch(pattern, k)
        if x:
            possible_characters.append(possible_items[x.group()])
    return possible_characters


print(possibilities("."))
print(possibilities(".-"))
print(possibilities("?"))
print(possibilities("?."))  # ["I", "N"]
print(possibilities(".?"))  # ["I", "A"]
