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
    # Filter by length
    possible_items = {key: morse_codes[key] for key in morse_codes.keys() if len(word) == len(key)}
    # sort the dictionary by its keys
    sorted_dictionary = sorted(possible_items, reverse=True)
    # Compile a regular expression pattern
    pattern = f""
    for c in word:
        pattern = f"{pattern}." if c == '?' else f"{pattern}\{c}"
    pattern = re.compile(pattern)
    possible_characters = []
    for k in sorted_dictionary:
        x = re.fullmatch(pattern, k)
        if x:
            possible_characters.append(possible_items[x.group()])
    return possible_characters


print(possibilities("."))
print(possibilities(".-"))
print(possibilities("?"))
print(possibilities("?."))  # ["I", "N"]
print(possibilities(".?"))  # ["I", "A"]
