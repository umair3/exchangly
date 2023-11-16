# ARG MY_ENV
FROM public.ecr.aws/lambda/python:3.11
# ENV PYTHONUNBUFFERED=1
# Copy requirements.txt
COPY requirements.txt ${LAMBDA_TASK_ROOT}
#ENV MY_ENV=$MY_ENV
# RUN mkdir /code
# WORKDIR /code
# COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . ${LAMBDA_TASK_ROOT}
# EXPOSE 8090

# Install Cron
# RUN apt-get update
# RUN apt-get -y install cron
# RUN crontab -l | { cat; echo "* * * * * bash /root/get_date.sh"; } | crontab -
# Run the command on container startup
# CMD cron
# RUN python manage.py makemigrations
# CMD python manage.py migrate && python manage.py runserver 0.0.0.0:8090
CMD [ "python manage.py runserver 0.0.0.0:8080" ]

# CMD [ "/bin/bash", "-c", "--" ]
# CMD [ "python manage.py runserver 0.0.0.0:8090" ]
# 