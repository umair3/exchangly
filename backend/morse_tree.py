from typing import List


# Node class for the Morse code tree
class Node:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right


def possibilities(signals: str) -> List[str]:
    # Create the Morse code tree
    root = Node("")
    root.left = Node("E")
    root.right = Node("T")
    root.left.left = Node("I")
    root.left.right = Node("A")
    root.right.left = Node("N")
    root.right.right = Node("M")
    root.left.left.left = Node("S")
    root.left.left.right = Node("U")
    root.left.right.left = Node("R")
    root.left.right.right = Node("W")
    root.right.left.left = Node("D")
    root.right.left.right = Node("K")
    root.right.right.left = Node("G")
    root.right.right.right = Node("O")

    # Split the signals into a list of dots and dashes
    signals_list = [s for s in signals]
    # Initialize the current node to the root of the tree
    curr_node = root
    # Initialize the list of possible characters
    possibilities = []
    # Traverse the tree to find the possible characters
    for signal in signals_list:
        print(signal)
        if signal == ".":
            curr_node = curr_node.left
        elif signal == "-":
            curr_node = curr_node.right
        # If we reach a leaf node, add the character to the list of possibilities
        if curr_node.left is None and curr_node.right is None:
            possibilities.append(curr_node.data)
            curr_node = root
        print(curr_node.data)
    return possibilities


# Test the function
# print(possibilities(""))  # Output: []
# print(possibilities("."))  # Output: ['E']
# print(possibilities("-..."))  # Output: ['B']
# print(possibilities("--.-."))  # Output: ['Q']
# print(possibilities("--.-.---"))  # Output: ['Q', 'Z']

print(possibilities("."))
print(possibilities(".-"))
# print(possibilities("?"))
# print(possibilities("?."))  # ["I", "N"]
# print(possibilities(".?"))  # ["I", "A"]

