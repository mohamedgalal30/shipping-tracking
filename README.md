## Installation &nbsp;
**1) Install [docker CE]- see docker documentions(https://www.docker.com/)**

**2) run mysql server with the following command**
```sh
docker run --name mysql-5.7 -e MYSQL_ROOT_PASSWORD=mypassword -d mysql:5.7
```

**3) find the IPAddress of mysql container**
run ```sh docker ps ``` then find the ID of the mysql-5.7 container
then run ```sh docker inspect {id-from-prev-step} | grep IPAddress ```

**4) change the value of mysql host to the IP from the previous step**
- open file config/env/development.js then find mysqlServer connection and change its value to the ip from previous step

- change the value in config/env/test.js also

**5) enable mysql old auth and create databases**
- run
```sh
docker exec -it mysql-5.7 mysql -uroot -p
```
- enter password ```mypassword```
- in mysql engine run 
```sh 
use mysql;update user set authentication_string=password(''), plugin='mysql_native_password' where user='root';create database shipping_tracking;create database shipping_tracking_test;
```

**6) Run npm install**
```sh
npm install
```

**7) Run grunt**
from project root run
```sh
./node_modules/.bin/grunt
```

**8) To run the applictation**
```sh
./node_modules/.bin/sails lift
```

**9) Browse the app**
In browser go to 
```sh
http://localhost:1337/
```

**10) To run test cases**
```sh
make test
```