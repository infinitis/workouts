build:
	docker build -t workouts .

run:
	docker run -d -p "8080:8080" --read-only -v `pwd`/src/:/home/node/app/src/ --name workouts-test workouts

extract: build run
	docker cp workouts-test:/home/node/app/workouts.min.js ./workouts.min.js
	$(MAKE) stop

start: build
	-docker run -it --rm -p "8080:8080" --read-only -v `pwd`/src/:/home/node/app/src/ --name workouts-test workouts

stop:
	docker stop workouts-test
	docker rm workouts-test

package_init:
	docker run -d --name workouts_package_init node:latest tail -f /dev/null
	docker cp package.json workouts_package_init:/home/node/
	docker cp package-lock.json workouts_package_init:/home/node/

package_extract:
	docker cp workouts_package_init:/home/node/package.json ./package.json
	docker cp workouts_package_init:/home/node/package-lock.json ./package-lock.json
	$(MAKE) -s package_stop

package_stop:
	docker stop workouts_package_init
	docker rm workouts_package_init

outdated: package_init
	-docker exec -it -w /home/node $$(docker container ls -q -f name=workouts_package_init) npm outdated
	$(MAKE) -s package_stop

update: package_init
	-docker exec -it -w /home/node $$(docker container ls -q -f name=workouts_package_init) /bin/bash
	$(MAKE) -s package_extract

inspect:
	docker exec -it $$(docker container ls -q -f name=workouts_package_init) /bin/bash