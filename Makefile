run: 
	cd ./client && npm run build && cd ../ && cd ./api && npm start

.PHONY: run