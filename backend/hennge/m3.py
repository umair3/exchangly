import requests
# from totp import generate_totp
import pyotp
from django.utils.baseconv import base64

headers = {
    'Content-Type': 'application/json'
}

data = {
  "github_url": "https://gist.github.com/umair3/96df558978782f85ff28ceff781035f7",
  "contact_email": "umair.anwr@gmail.com",
  "solution_language": "python"
}

# password = generate_totp('umair.anwr@gmail.comHENNGECHALLENGE003', 10)
# generating TOTP codes with provided secret
totp = pyotp.TOTP(base64('umair.anwr@gmail.comHENNGECHALLENGE003'))
password = totp.now()
print(f"password={password}")

response = requests.post(
    url='https://api.challenge.hennge.com/challenges/003',
    headers=headers,
    auth=('umair.anwr@gmail.com', totp.now()),
    data=data
)
print(response.status_code)
