# Execução do Cerrado DPAT

Para execução do Cerrado DPAT são necessárias 3 estruturas criadas e funcionais na máquina do usuário:

1. O Banco de Dados `fip_cerrado` restaurado no serviço do PostgreSQL devidamente instalado com a extensão PostGis.

2. O serviço *OWS Server* devidamente configurado e executando em um IP e porta.

3. O *Application Server* e client (Front-end) da aplicação compilados e executando.


## Restaurando e disponibilizando o banco de dados FIP-Cerrado

#Extrai o dump do banco FIP_CERRADO
tar -xfv BKP_BANCO_DADOS_FIP_CERRADO.tar.gz

#Exporta senha do banco
export PGPASSWORD=

#Cria database
psql -h 127.0.0.1 -U fip_cerrado -c "create database lapig;"

#Cria extensao do postgis
psql -h 127.0.0.1 -U fip_cerrado -d fip_cerrado -c "create extension postgis;"

#Cria extensao do plpgsql
psql -h 127.0.0.1 -U fip_cerrado -d fip_cerrado -c "create extension plpgsql;"

#Restaura o banco FIP_CERRADO usando os 24 nucleos
pg_restore -U fip_cerrado -h 127.0.0.1 -v -j 24 --format=d -C -d fip_cerrado fip_cerrado.sql/


## Execução do OWS Server




## Execução da aplicação Cerrado DPAT


### Ambiente de Desenvolvimento


### Ambiente de Produção



## Script completo com execução completa para Produção

