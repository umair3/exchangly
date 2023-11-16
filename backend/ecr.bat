aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 394004086778.dkr.ecr.ap-southeast-1.amazonaws.com
docker build --platform linux/amd64 -t exchangly:latest .
docker tag exchangly:latest 394004086778.dkr.ecr.ap-southeast-1.amazonaws.com/exchangly:latest
docker push 394004086778.dkr.ecr.ap-southeast-1.amazonaws.com/exchangly:latest