# Dados Vetoriais
No Cerrado DPAT todos os dados vetoriais estão armazenados em um banco de dados PostgreSQL. O último backup deste banco pode ser encontrado no [link](https://drive.google.com/file/d/19nVhry3bvHpV_oY861saBV9prXpfnFtd/view?usp=sharing) no arquivo `BKP_BANCO_DADOS_FIP_CERRADO.tar.gz`. 

## Banco de dados e MER
TODO

### Principais entidades
TODO

## Processo de atualização

Diversos dados presentes na plataforma Cerrado DPAT são periodicamente atualizados pelas instituições competentes. Desta forma, a medida que os mesmos são atualizados e disponibilizados pelas instituições também é necessário realizar a atualização no banco de dados do Cerrado DPAT.

### PRODES Cerrado

Devido a divulgação anual do PRODES-Cerrado é necessário realizar a sua atualização sempre que um novo produto é lançado. Desta forma, deve-se visitar o site do [Terrabrasilis](http://terrabrasilis.dpi.inpe.br/downloads/) para verificar se um novo PRODES-Cerrado foi lançado e realizar o seu download em Shapefile. 

A fim de demonstrar todos os procedimentos necessários após uma nova atualização do PRODES-Cerrado, iremos utilizar o mesmo processo realizado na atualização do PRODES-Cerrado 2019 executada em Janeiro de 2020. Na ocasião o INPE disponibilizou um Shapefile único para o PRODES-Cerrado 2019 com uma estrutura própria detalhada a seguir. Atualmente, pode-se encontrar todos os desmatamentos PRODES-Cerrado em um Shapefile único no [link](http://terrabrasilis.dpi.inpe.br/download/dataset/cerrado-prodes/vector/yearly_deforestation_2002_2019_cerrado_biome.zip). Porém é importante ressaltar que o padrão das colunas disponibilizados pelo INPE pode ser alterada em atualizações futuras.

Após download do shapefile único contendo os desmatamentos PRODES-Cerrado 2019, primeiramente é necessário importar os dados para o banco de dados, alterando corretamente os parâmetros <host_address> <db_user> <db_name> abaixo:

``` sh
shp2pgsql -s 4674 -W "UTF-8" ProdesCerrado_2019_incremento.shp public.prodes2019 | psql -h <host_address> -U <db_user> -d <db_name>
```

O comando acima importa os dados do Shapefile em uma tabela nomeada `prodes2019`. Na ocasião, o PRODES-Cerrado 2019 foi disponibilizado sem o campo de identificação em qual município aquele desmatamento ocorreu e com a coluna `state` que identificava os estados pelo nome por extenso. Portanto, inicialmente deve-se alterar o padrão dos estados para utilizar o campo *uf* com apenas 2 caracteres.

``` sql
ALTER TABLE prodes2019 
ADD COLUMN uf character varying(2);
```

Em seguida, preencha o campo `uf` com o seguinte comando:

``` sql
update prodes2019 
set uf = CASE
	when state = 'PARÁ' THEN 'PA'
	when state = 'MATO GROSSO' THEN 'MT'
	WHEN state = 'PIAUÍ' THEN 'PI'
	WHEN state = 'BAHIA' THEN 'BA'
	WHEN state = 'MARANHÃO' THEN 'MA'
	WHEN state = 'TOCANTINS' THEN 'TO'
	WHEN state = 'MATO GROSSO DO SUL' THEN 'MS'
	WHEN state = 'MINAS GERAIS' THEN 'MG'
	WHEN state = 'PARANÁ' THEN 'PR'
	WHEN state = 'RONDÔNIA' THEN 'RO'
	WHEN state = 'SÃO PAULO' THEN 'SP'
	WHEN state = 'DISTRITO FEDERAL' THEN 'DF'
	WHEN state = 'GOIÁS' THEN 'GO'
	ELSE '00'
END
```

Além dos estados, caso as novas atualizações não possuam a identificação do município, deve-se verificar se o mesmo polígono de desmatamento se encontra em mais de um município ao mesmo tempo, o que pode ser alcançado com a query abaixo. **Vale ressaltar que os passos descritos abaixo só devem ser executados caso o INPE não identifique o município onde ocorreu o desmatamento.**

``` sql
SELECT prodes.gid, count(city.*)
FROM prodes2019 prodes
inner join municipios_cerrado city on ST_INTERSECTS(city.geom, prodes.geom)
GROUP BY prodes.gid HAVING COUNT(city.*) > 1
```

Em seguida, deve-se copiar os polígonos PRODES-Cerrado 2019 para uma tabela alternativa `prodes2019_alt` (que possui o campo de município) dividindo o polígono nas porções que pertencem a cada município. Esta operação irá aumentar a quantidade de polígonos no banco, porém não irá impactar na área desmatada. 


``` sql
ALTER TABLE prodes2019 
ADD COLUMN county character varying(60);
```


``` sql
insert into prodes2019_alt (id, state, path_row, class_name, image_date, year, area_km2, uf, county, geom)
select prodes.id, prodes.state, prodes.path_row, prodes.class_name, prodes.image_date, prodes.year, prodes.area_m2, prodes.uf, city.nm_municip, ST_Multi(ST_INTERSECTION(prodes.geom, city.geom)) from prodes2019 prodes 
inner join municipios_cerrado city on ST_INTERSECTS(prodes.geom, city.geom)
```

Além de criar o campo `county`, deve-se também já armazenar o valor da área do desmatamento de cada polígono na tabela `prodes2019_alt` já convertendo para km².

``` sql
update prodes2019_alt
set area_km2 = ST_AREA(geom::GEOGRAPHY) / 1000000.0
where year = 2019
```

Por fim, deve-se inserir os polígonos PRODES-Cerrado 2019 na tabela oficial onde estão todos os polígonos, incluindo a longitude e latitude do Centróide do polígono.

``` sql
insert into prodes_cerrado (uid, pathrow, view_date, source, areamunkm, uf, geom, year, classname, lat, long)
select id, path_row, image_date, 'inpe cerrado' , area_m2, uf, geom, year, class_name, st_y(ST_PointOnSurface(geom)), st_x(ST_PointOnSurface(geom)) from prodes2019_alt
```


### DETER Cerrado

Devido a constante revisão do DETER-Cerrado, onde polígonos de desmatamento são reanalisados e validados antes de sua consolidação no PRODES-Cerrado, ao atualizar este produto é necessário excluir todos os dados anteriores sobre ele e inserir o novo por completo. Para tal, o primeiro passo é excluir os registros na tabela `deter_cerrado`.

``` sql
TRUNCATE TABLE deter_cerrado RESTART IDENTITY;
```

Em seguida, deve-se realizar o download do [Shapefile](http://terrabrasilis.dpi.inpe.br/geonetwork/srv/eng/catalog.search#/metadata/e6e15388-4ca9-49b9-aec9-03891339a35e) com todos os Avisos Deter-Cerrado e em seguida pode-se inserir o shape em uma tabela temporária no banco de dados, nomeada `deter_public`, através do comando:


``` sh
shp2pgsql -s 4674 -W "UTF-8" deter_public.shp public.deter_public | psql -h <host_address> -U <db_user> -d <db_name>
```

Com o shape carregado na tabela `deter_public` no banco de dados, basta popular a tabela `deter_cerrado` com o seguinte comando em SQL:

``` sql
insert into deter_cerrado (classname, path_row, view_date, sensor, satellite, areamunkm, county, uf, uc, geom)
select classname, path_row, view_date, sensor, satellite, areamunkm, municipali, uf, uc, geom from deter_public
```

Por fim, deve-se também atualizar a latitude e longitude do centróide do polígono DETER-Cerrado:

``` sql
update deter_cerrado
set lat = st_y(ST_PointOnSurface(geom)),
	long = st_x(ST_PointOnSurface(geom))
where lat is null and long is null;
```


### Cadastro Ambiental Rural (CAR)

Após a criação dos quatro shapefiles com os principais componentes do CAR (Propriedades Rurais, Reserva Legal, Área de Preservação Permanence e Nascentes) deve-se inserir corretamente estes dados no banco de dados.

``` sh
shp2pgsql -s 4674 -W "UTF-8" car.shp public.car_cerrado_temp | psql -h <host_address> -U <db_user> -d <db_name>
```

### Cruzamentos espaciais entre os dados

#### PRODES e DETER-Cerrado com o CAR

Após realizar a atualização dos dados PRODES-Cerrado, DETER-Cerrado e do CAR é necessário realizar os cruzamentos espaciais entre estes dados. Portanto, primeiramente é importante apagar os registros anteriores. Inicialmente iremos apagar a tabela de relacionamento entre os dados do CAR e os polígonos PRODES e DETER-Cerrado.

``` sql
TRUNCATE TABLE car_desmat RESTART IDENTITY;
```

Em seguida, inicialmente deve-se inserir (em relação de 1:1) o cruzamento entre as propriedades do CAR e os polígonos PRODES-Cerrado na tabela `car_desmat`:

``` sql
insert into car_desmat (car_cerrado_id, idt_imovel, prodes_id)
select car.gid, car.idt_imovel, prodes.gid from car_cerrado car 
inner join prodes_cerrado prodes on ST_INTERSECTS(car.geom, prodes.geom) where prodes.year >= 2013
```

Após o PRODES-Cerrado, insere-se os cruzamentos com o DETER-Cerrado:

``` sql
insert into car_desmat (car_cerrado_id, idt_imovel, deter_id)
select car.gid, car.idt_imovel, prodes.gid from car_cerrado car 
inner join deter_cerrado prodes on ST_INTERSECTS(car.geom, prodes.geom)
```

Com as relações criadas, atualiza-se a tabela `car_desmat` com a quantidade de nascentes e cada desmatamento detectado dentro de uma propriedade rural:

``` sql
update car_desmat
set qnt_nascente = sub.qnt 
from 
    (
      select c.car_cerrado_id as internocar, c.prodes_id as internoprodes, count(rl.gid) as qnt
      from geo_car_nascente_cerrado rl
      inner join car_desmat c on c.idt_imovel = rl.idt_imovel 
      group by 1,2
     ) as sub 
where sub.internocar = car_desmat.car_cerrado_id and sub.internoprodes = car_desmat.prodes_id
```

#### PRODES-Cerrado com os pontos da Validação de Campo

Após atualização dos dado PRODES-Cerrado, é necessária a atualização da referência ao polígono PRODES-Cerrado em relação aos pontos visitados durante a validação de campo. Para tal, executasse a seguinte query:

``` sql
UPDATE pontos_campo
set prodes_id = p.gid
from prodes_cerrado p
where pontos_campo.prodes_id is null and ST_INTERSECTS(p.geom, pontos_campo.geom)
```

Em seguida, realiza-se o mesmo processo em relação aos polígonos DETER-Cerrado:

``` sql
UPDATE pontos_campo
set deter_id = d.gid
from deter_cerrado d
where pontos_campo.deter_id is null and ST_INTERSECTS(d.geom, pontos_campo.geom)
```


#### PRODES-Cerrado com os pontos da Validação Amostral

Após atualização dos dado PRODES-Cerrado, é necessária a atualização da referência ao polígono PRODES-Cerrado em relação aos pontos inspecionados durante a validação amostral. Para tal, executasse a seguinte query:

``` sql
UPDATE validacao_amostral
set prodes_id = p.gid
from prodes_cerrado p
where validacao_amostral.prodes_id is null and ST_INTERSECTS(p.geom, validacao_amostral.geom)
```

#### PRODES-Cerrado com todas regiões (Municípios e Estados) em relação ao uso do solo.

Após atualização do PRODES-Cerrado, também é necessário o cálculo da proporção de desmatamento em cada tipo de uso do solo para os polígonos recém inseridos no banco de dados. Desta forma, para calcular e inserir no banco esta informação para estados e municípios respectivamente deve-se executar as seguintes queries:

    Terraclass

``` sql
insert into prodes_regions_lulc (region_id, year, type, classe_lulc, color, desmat_area_classe_lulc, fonte)
select r.gid, p.year, 'state', lc.classe, g.color,
	sum(st_area(safe_intersection(p.geom, lc.geom)::geography) / 1000000.0::double precision), 'terraclass'
from regions r
inner join uso_solo_terraclass lc on r.value = lc.uf
inner join prodes_cerrado p on r.value = p.uf
INNER JOIN graphic_colors g on unaccent(g.name) ilike unaccent(lc.classe) AND g.table_rel = 'uso_solo_terraclass'
	where r.type = 'state' and ST_INTERSECTS(p.geom, lc.geom) and p.year >= 2013 group by 1,2,3,4,5;
```

``` sql
insert into prodes_regions_lulc (region_id, year, type, classe_lulc, color, desmat_area_classe_lulc, fonte)
select r.gid, p.year, 'city', lc.classe, g.color,
	sum(st_area(safe_intersection(p.geom, lc.geom)::geography) / 1000000.0::double precision), 'terraclass'
from regions r
inner join uso_solo_probio lc on r.cd_geocmu = lc.cd_geocmu
inner join prodes_cerrado p on r.cd_geocmu = p.cd_geocmu
INNER JOIN graphic_colors g on unaccent(g.name) ilike unaccent(lc.classe) AND g.table_rel = 'uso_solo_terraclass'
	where r.type = 'city' and ST_INTERSECTS(p.geom, lc.geom) and p.year > 2000 and p.year < 2012 group by 1,2,3,4,5;
```

    PROBIO

``` sql
insert into prodes_regions_lulc (region_id, year, type, classe_lulc, color, desmat_area_classe_lulc, fonte)
select r.gid, p.year, 'state', lc.classe, g.color,
	sum(st_area(safe_intersection(p.geom, lc.geom)::geography) / 1000000.0::double precision), 'probio'
from regions r
inner join uso_solo_probio lc on r.value = lc.uf
inner join prodes_cerrado p on r.value = p.uf
INNER JOIN graphic_colors g on unaccent(g.name) ilike unaccent(lc.classe) AND g.table_rel = 'uso_solo_probio'
where r.type = 'state' and ST_INTERSECTS(p.geom, lc.geom) and p.year > 2000 and p.year < 2013 group by 1,2,3,4,5;
```

``` sql
insert into prodes_regions_lulc (region_id, year, type, classe_lulc, color, desmat_area_classe_lulc, fonte)
select r.gid, p.year, 'city', lc.classe, g.color,
	sum(st_area(safe_intersection(p.geom, lc.geom)::geography) / 1000000.0::double precision), 'probio'
from regions r
inner join uso_solo_probio lc on r.cd_geocmu = lc.cd_geocmu
inner join prodes_cerrado p on r.cd_geocmu = p.cd_geocmu
INNER JOIN graphic_colors g on unaccent(g.name) ilike unaccent(lc.classe) AND g.table_rel = 'uso_solo_probio'
	where r.type = 'city' and ST_INTERSECTS(p.geom, lc.geom) and p.year > 2000 and p.year < 2012 group by 1,2,3,4,5;
```

    Agrosatélite

``` sql
insert into prodes_regions_lulc (region_id, year, type, classe_lulc, color, desmat_area_classe_lulc, fonte)
select r.gid, p.year, 'state', lc.classe, g.color,
	sum(st_area(safe_intersection(p.geom, lc.geom)::geography) / 1000000.0::double precision), 'agrosatelite'
from regions r
inner join uso_solo_terraclass lc on r.value = lc.uf
inner join prodes_cerrado p on r.value = p.uf
INNER JOIN graphic_colors g on unaccent(g.name) ilike unaccent(lc.classe) AND g.table_rel = 'uso_solo_terraclass'
	where r.type = 'state' and ST_INTERSECTS(p.geom, lc.geom) and p.year >= 2013 group by 1,2,3,4,5;
```

``` sql
insert into prodes_regions_lulc (region_id, year, type, classe_lulc, color, desmat_area_classe_lulc, fonte)
select r.gid, p.year, 'city', lc.classe, g.color,
	sum(st_area(safe_intersection(p.geom, lc.geom)::geography) / 1000000.0::double precision), 'agrosatelite'
from regions r
inner join uso_solo_probio lc on r.cd_geocmu = lc.cd_geocmu
inner join prodes_cerrado p on r.cd_geocmu = p.cd_geocmu
INNER JOIN graphic_colors g on unaccent(g.name) ilike unaccent(lc.classe) AND g.table_rel = 'agricultura_agrosatelite'
	where r.type = 'city' and ST_INTERSECTS(p.geom, lc.geom) and p.year > 2000 and p.year < 2012 group by 1,2,3,4,5;
```

Por fim, é necessário ajustar algumas colunas da tabela `prodes_regions_lulc`, tais como a `total_area_classe_lulc` que representa o total da área de cada classe de uso solo dos mapas. Para facilitar, os comandos foram reunidos neste [arquivo]() sql. Portanto, basta fazer download do script e executá-lo em um terminal SQL.
