
def look_say(number: int) -> int:
    if number <= 0:
        return 10
    current = None
    current_count = 0
    result = ''
    while number > 0:
        digit = number % 10
        if current == digit:
            current_count += 1
        else:
            result = f"{current_count}{current}{result}" if current is not None else ""
            current = digit
            current_count = 1
        number = number // 10
    result = f"{current_count}{current}{result}"
    return int(result)


print(look_say(0))  # 10
print(look_say(1))  # 11
print(look_say(11))  # 21
print(look_say(12))  # 1112
print(look_say(21))  # 1211
print(look_say(9000))  # 1930
print(look_say(222222222222))  # 122
print(look_say(333444444))  # 3364
print(look_say(444333444))  # 343334
# 1 is read as "one 1" => 11
# 11 is read as "two 1s" => 21
# 21 is read as "one 2, then one 1" => 1211
# 9000 is read as "one 9, then 3 0s" => 1930
# 222222222222 is read as "twelve 2s" => 122
