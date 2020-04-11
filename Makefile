IMAGE_NAME=workouts
CONTAINER_NAME=workouts-test

PACKAGE_CONTAINER_NAME=workouts_package_init
EXTRACTION_TARGET=workouts.min.js

build:
	docker build -t $(IMAGE_NAME) .

run:
	docker run -d -p "8080:8080" --read-only -v `pwd`/src/:/home/node/app/src/ --name $(CONTAINER_NAME) $(IMAGE_NAME)

extract: build run
	docker cp $(CONTAINER_NAME):/home/node/app/$(EXTRACTION_TARGET) ./$(EXTRACTION_TARGET)
	$(MAKE) stop

start: build
	-docker run -it --rm -p "8080:8080" --read-only -v `pwd`/src/:/home/node/app/src/ --name $(CONTAINER_NAME) $(IMAGE_NAME)

stop:
	docker stop $(CONTAINER_NAME)
	docker rm $(CONTAINER_NAME)

package_init:
	docker run -d --name $(PACKAGE_CONTAINER_NAME) node:latest tail -f /dev/null
	docker cp package.json $(PACKAGE_CONTAINER_NAME):/home/node/
	docker cp package-lock.json $(PACKAGE_CONTAINER_NAME):/home/node/

package_extract:
	docker cp $(PACKAGE_CONTAINER_NAME):/home/node/package.json ./package.json
	docker cp $(PACKAGE_CONTAINER_NAME):/home/node/package-lock.json ./package-lock.json
	$(MAKE) -s package_stop

package_stop:
	docker stop $(PACKAGE_CONTAINER_NAME)
	docker rm $(PACKAGE_CONTAINER_NAME)

outdated: package_init
	-docker exec -it -w /home/node $$(docker container ls -q -f name=$(PACKAGE_CONTAINER_NAME)) npm outdated
	$(MAKE) -s package_stop

update: package_init
	-docker exec -it -w /home/node $$(docker container ls -q -f name=$(PACKAGE_CONTAINER_NAME)) /bin/bash
	$(MAKE) -s package_extract

inspect:
	docker exec -it $$(docker container ls -q -f name=$(PACKAGE_CONTAINER_NAME)) /bin/bash