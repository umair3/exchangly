from mmbe.settings import RECAPTCHA_SECRET_KEY
import requests


class Recaptcha:

    @staticmethod
    def verify(g_recaptcha_response: str) -> bool:
        print(f"Recaptcha.verify({g_recaptcha_response})")
        url = 'https://www.google.com/recaptcha/api/siteverify'
        data = {
            'secret': RECAPTCHA_SECRET_KEY,
            'response': g_recaptcha_response,
            # 'remoteip': ,
        }
        response = requests.post(url, data=data)
        if response.status_code == 200:
            """
            {
              "success": true|false,
              "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
              "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
              'score': 0.9, 
              'action': 'submit'
              "error-codes": [...]        // optional
            }
            """
            json = response.json()
            print(json)
            if json["success"]:
                if json["score"] >= 0.7:
                    return True
        return False
