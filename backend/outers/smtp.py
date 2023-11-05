# import smtplib
#
# sender = 'marry.james@exchangly.com'
# receivers = ['umair.anwr@gmail.com']
#
# message = """From: From Marry James <marry.james@exchangly.com>
# To: To Umair Anwar <umair.anwr@exchangly.com>
# Subject: SMTP e-mail test
#
# This is a test e-mail message.
# """
#
# try:
#    smtpObj = smtplib.SMTP('email-smtp.ap-southeast-1.amazonaws.com')
#    smtpObj.sendmail(sender, receivers, message)
#    print("Successfully sent email")
# except smtplib.SMTPException:
#    print("Error: unable to send email")


import smtplib, ssl

port = 465  # For SSL
password = "BFiZAth6Z8GKBO1d95M89HTLgJR7ghri3pvEOTYrwDrc"

# Create a secure SSL context
context = ssl.create_default_context()

with smtplib.SMTP_SSL("email-smtp.ap-southeast-1.amazonaws.com", port, context=context) as server:
    server.login("AKIAVXPDZH75BNGKSPEM", password)
    sender = 'marry.james@exchangly.com'
    receivers = ['umair.anwr@gmail.com']

    message = """
    This is a test e-mail message.
    """
    server.sendmail(sender, receivers, message)
