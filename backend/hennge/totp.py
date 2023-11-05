import hashlib
import hmac
import math
import time


def generate_totp(shared_key: str, length: int = 6) -> str:
    now_in_seconds = math.floor(time.time())
    step_in_seconds = 30
    t = math.floor(now_in_seconds / step_in_seconds)
    hash = hmac.new(
        bytes(shared_key, encoding="utf-8"),
        t.to_bytes(length=8, byteorder="big"),
        hashlib.sha3_512,
    )

    return dynamic_truncation(hash, length)


def dynamic_truncation(raw_key: hmac.HMAC, length: int) -> str:
    bitstring = bin(int(raw_key.hexdigest(), base=16))
    # >> 11010100000110011101010100010001100100011111001010111010001010110110000010111101000101011110111111010111101100011101001111100001011111101100001011110111100111001111100000100010011001010110101111100010111001001000010000011000000010010111100110101100011
    last_four_bits = bitstring[-4:]
    # >> 0011
    offset = int(last_four_bits, base=2)
    # >> 3
    chosen_32_bits = bitstring[offset * 8: offset * 8 + 32]
    # >> 01000100011001000111110010101110
    full_totp = str(int(chosen_32_bits, base=2))
    # >> 1147436206
    return full_totp[-length:]
    # >> 436206
