EXTRA_DIST = \
	.babelrc \
	index.html \
	Makefile.am \
	package.json \
	package-lock.json \
	src/classes/workout.js \
	src/components/days.ago/days.ago.component.js \
	src/components/days.ago/days.ago.css \
	src/components/days.ago/days.ago.js \
	src/components/header/header.component.js \
	src/components/header/header.css \
	src/components/header/header.js \
	src/components/main/main.component.js \
	src/components/main/main.css \
	src/components/main/main.js \
	src/components/manage/manage.component.js \
	src/components/manage/manage.css \
	src/components/manage/manage.js \
	src/components/manage.row/manage.row.css \
	src/components/manage.row/manage.row.js \
	src/components/recent/recent.component.js \
	src/components/recent/recent.css \
	src/components/recent/recent.js \
	src/components/recent.row/recent.row.css \
	src/components/recent.row/recent.row.js \
	src/constants.js \
	src/data/action.js \
	src/data/attributes.js \
	src/data/load.js \
	src/data/recent.js \
	src/data/workouts.js \
	src/index.js \
	src/reducers/combined.js \
	src/reducers/sync.js \
	src/reducers/view.js \
	src/reducers/workouts.js \
	src/util/request.js \
	src/util/backend.js \
	test/data.action.tests.js \
	test/sync.reducer.tests.js \
	test/view.reducer.tests.js \
	test/workouts.reducer.tests.js \
	test/workout.tests.js \
	webpack.config.js \
	webpack.dev.config.js \
	webpack.prod.config.js \
	workouts.json

if ENABLE_GUI

if HAVE_DOCKER
IMAGE_NAME=workouts
CONTAINER_NAME=workouts-test

PACKAGE_CONTAINER_NAME=workouts_package_init
EXTRACTION_TARGET=workouts.js

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

outdated: buid package_init
	-docker exec -it -w /home/node $$(docker container ls -q -f name=$(PACKAGE_CONTAINER_NAME)) npm outdated
	$(MAKE) -s package_stop

update: build package_init
	-docker exec -it -w /home/node $$(docker container ls -q -f name=$(PACKAGE_CONTAINER_NAME)) /bin/bash
	$(MAKE) -s package_extract

inspect:
	docker exec -it $$(docker container ls -q -f name=$(PACKAGE_CONTAINER_NAME)) /bin/bash

else
build: missing-local
run: missing-local
extract: missing-local
start: missing-local
stop: missing-local
package_init: missing-local
package_extract: missing-local
package_stop: missing-local
outdated: missing-local
update: missing-local
inspect: missing-local
missing-local:
	@echo "docker not found"
endif

if HAVE_NODE
all-local:
	npm install
	npm run build

clean-local:
	rm -f workouts.js

check-local:
	npm run test
else
all-local: missing-local
check-local: missing-local
missing-local:
	@echo "node not found"
endif

else
all-local:
	@echo "gui not enabled"
endif