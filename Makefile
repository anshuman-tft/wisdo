run:
	docker-compose up wisdo

build:
	docker-compose build wisdo
	docker-compose up --no-deps -d wisdo

# installs nodemon (used to restart node upon code changes)
build-dev:
	docker-compose build --build-arg BUILD_ENV=development wisdo
	docker-compose up --no-deps -d wisdo