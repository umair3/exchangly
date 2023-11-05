import boto3


class EmailService:

    def __init__(self) -> None:
        super().__init__()

    def send(self, to, subject, data) -> object:
        client = boto3.client(
            'ses',
            region_name='eu-west-3',
            aws_access_key_id='',
            aws_secret_access_key=''
        )
        response = client.send_email(
            Destination={
                'BccAddresses': [
                    'marry.james@exchangly.com'
                ],
                # 'CcAddresses': [
                # ],
                'ToAddresses': [
                    to,
                ],
            },
            Message={
                'Body': {
                    'Html': {
                        'Charset': 'UTF-8',
                        'Data': data,
                    },
                    'Text': {
                        'Charset': 'UTF-8',
                        'Data': data,
                    },
                },
                'Subject': {
                    'Charset': 'UTF-8',
                    'Data': subject,
                },
            },
            # ReplyToAddresses=[
            # ],
            # ReturnPath='',
            # ReturnPathArn='',
            Source='marry.james@exchangly.com',
            # SourceArn='',
        )
        print(response)
        return response


# es = EmailService()
# es.send('umair.anwr@gmail.com', 'my subject', 'my data')
