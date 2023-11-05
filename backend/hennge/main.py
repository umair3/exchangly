"""
Mr. UMAIR ANWAR
<umair.anwr@gmail.com>
"""


def find_first_space_index(integers_string: str, i: int) -> int:
    if i >= len(integers_string):
        return i
    if integers_string[i:i+1] == ' ':
        return i
    return find_first_space_index(integers_string, i+1)


def sum_of_square(integers_count: int, integers_string: str):
    space_index = find_first_space_index(integers_string, 0)
    x = int(integers_string[0:space_index])
    # print(f"space_index={space_index}, x={x}")
    if x > 0:
        x = x**2
    integers_count -= 1
    if integers_count > 0:
        if x > 0:
            return x + sum_of_square(integers_count, integers_string[space_index+1:])
        else:
            return sum_of_square(integers_count, integers_string[space_index+1:])
    return x


def test_case(n: int, output: []) -> []:
    if n < 1:
        return
    integers_count: int = int(input())
    integers_string: str = input()
    # not using split() and map() here to get list of integers, just to show my string manipulation skills.
    # line2 = map(int, integers_string.split(' '))
    n = n - 1
    test_case(n, output)
    output.append(sum_of_square(integers_count, integers_string))
    return output


def print_reverse_order(my_list: [], i: int):
    if i < 0:
        return
    print(my_list[i])
    i = i - 1
    print_reverse_order(my_list, i)


def main():
    """
    We want you to calculate the sum of squares of given integers, excluding any negatives.
    The first line of the input will be an integer N (1 <= N <= 100), indicating the number of test cases to follow.
    Each of the test cases will consist of a line with an integer X (0 < X <= 100), followed by another line consisting of X number of space-separated integers Yn (-100 <= Yn <= 100).
    For each test case, calculate the sum of squares of the integers, excluding any negatives, and print the calculated sum in the output.
    Note: There should be no output until all the input has been received.
    Note 2: Do not put blank lines between test cases solutions.
    Note 3: Take input from standard input, and output to standard output.
    Your source code must be a single file, containing at least a main function
    Do not use any for loop, while loop, or any list / set / dictionary comprehension
    Sample Input
    2
    4
    3 -1 1 14
    5
    9 6 -53 32 16
    Sample Output
    206
    1397
    """
    n: int = int(input())
    output = test_case(n, [])
    print_reverse_order(output, len(output)-1)


if __name__ == "__main__":
    main()
