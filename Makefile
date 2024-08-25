run: 
	cd ./client && npm run build && cd ../ && cd ./api && npm start

install:
	cd ./client && npm install && cd ../ && cd ./api && npm install

.PHONY: run install