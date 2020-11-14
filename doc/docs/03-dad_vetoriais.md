# Dados Vetoriais
TODO

## Banco de dados e MER
TODO

### Principais entidades
TODO

## Processo de atualização
TODO

### PRODES Cerrado
TODO

### DETER Cerrado

Devido a constante revisão do DETER-Cerrado, onde polígonos de desmatamento são reanalisados e validados antes de sua consolidação no PRODES-Cerrado, ao atualizar este produto é necessário excluir todos os dados anteriores sobre ele e inserir o novo por completo. Para tal, o primeiro passo é excluir os registros na tabela `deter_cerrado`.

``` sql
TRUNCATE TABLE deter_cerrado RESTART IDENTITY;
```

Em seguida, deve-se realizar o download do [Shapefile](http://terrabrasilis.dpi.inpe.br/geonetwork/srv/eng/catalog.search#/metadata/e6e15388-4ca9-49b9-aec9-03891339a35e) com todos os Avisos Deter-Cerrado e em seguida pode-se inserir o shape em uma tabela temporária no banco de dados, nomeada `deter_public`, através do comando:






### Cadastro Ambiental Rural
TODO