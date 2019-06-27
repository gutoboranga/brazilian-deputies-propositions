
run:
	node themesParser.js
	node themesCounter.js

clean:
	@rm temas.txt
	@rm ocorrencias.txt
	@echo "> Clean!"
