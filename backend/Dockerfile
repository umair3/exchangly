# ARG MY_ENV
FROM python:3.10
ENV PYTHONUNBUFFERED=1
#ENV MY_ENV=$MY_ENV
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
EXPOSE 8090

#Install Cron
RUN apt-get update
RUN apt-get -y install cron
RUN crontab -l | { cat; echo "* * * * * bash /root/get_date.sh"; } | crontab -
# Run the command on container startup
CMD cron
# RUN python manage.py makemigrations
RUN python manage.py migrate
CMD python manage.py runserver 0.0.0.0:8090

# CMD [ "/bin/bash", "-c", "--" ]
# CMD [ "python manage.py runserver 0.0.0.0:8090" ]
