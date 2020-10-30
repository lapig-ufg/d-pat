# Funcionalidades

## Dashboard 

O dashboard do Cerrado DPAT é formado por cinco elementos principais:

![Dashboard do Cerrado DPAT.](imgs/01/dashboard.jpg)
<p style='text-align: center;'><i>Dashboard do Cerrado DPAT.</i></p>

**1 - Controle de Visualização**

<p style='text-align: justify;'>Permite o controle do nível de zoom do mapa, além de ocultar e ativar a visualização da “Camada de Dados”. Também fornece ao usuário o acesso aos materiais explicativos da plataforma, tais como vídeos de eventos e tutoriais.</p>

**2 - Camada de Dados**

<p style='text-align: justify;'>Agrega todos os dados que podem ser exibidos no mapa, agrupados nas seguintes seções: Desmatamento; Áreas Especiais; Áreas Declaradas; Uso da Terra; Infraestrutura; Geofísico; Edafoclimáticos; Acervo de Imagens. Também permite ao usuário, com opções agrupadas em abas, o controle do mapa base (Mapbox, Google Maps e Bing), dos limites que são mostrados no mapa, e o upload de uma área de interesse que pode ser enviada nos formatos shapefile, geojson e kml.</p>

![Camadas de dados que podem ser ativadas e visualizadas no mapa.](imgs/01/camadadedados.jpg)
<p style='text-align: center;'><i>Camadas de dados que podem ser ativadas e visualizadas no mapa.</i></p>

**3 - Mapa interativo**

Área onde todas as camadas de dados são visualizadas.

**4 - Legenda**

Legenda correspondente às camadas de dados habilitadas para visualização.

**5 - Estatísticas de Desmatamento sobre o PRODES-Cerrado**

<p style='text-align: justify;'>Expõe as estatísticas de desmatamento e uso do solo de acordo com a unidade de análise escolhida pelo usuário (Estado ou Município). Por padrão, exibe para todo o bioma Cerrado, o total anual da área desmatada no período 2000-2019. De acordo com o ano de interesse do usuário e, a partir do cruzamento com dados do Cadastro Ambiental Rural (CAR), também apresenta o total desmatado em Área de Preservação Permanente (APP) e em Reserva Legal (RL) nos dez municípios com a maior área desmatada dentro destas categorias.</p>

![Estatísticas gerais para municípios, estados e todo o bioma Cerrado.](imgs/01/estatisticas_desmatamento.jpg)
<p style='text-align: center;'><i>Estatísticas gerais para municípios, estados e todo o bioma Cerrado.</i></p>

## Camada de dados - desmatamento

<p style='text-align: justify;'>Essa seção tem por objetivo espacializar o total desmatado, detectado em cada ano, pelos sistemas PRODES-Cerrado e DETER-Cerrado. Estes dados podem ser ativados para dois níveis: município e polígono.</p>


<img src="/imgs/01/camdados_desmatamento.png" width="268" height="446" align="left" >


<p style='text-align: justify;'>Destaca-se também a possibilidade de ativar os polígonos interseccionados com propriedades participantes do projeto FIP ABC, assim como todas as áreas desmatadas visitadas em campo, com os respectivos dados coletados em cada área. Uma outra forma de visualização do dado PRODES-Cerrado é por total acumulado anual. Ou seja, a área antrópica total do bioma Cerrado para cada ano.</p>

<p style='text-align: justify;'>Para verificar a suscetibilidade ao desmatamento dos polígonos detectados a partir de 2016, foram criadas duas superfícies. Estas camadas, com resolução de 100m, foram concebidas a partir dos padrões observados nos desmatamentos pequenos (< 0,5 km²) e grandes (> 0,5 km²) ocorridos entre os anos de 2010 e 2015.</p>

<br>
<br>
<br>
<br>



## Visualização em nivel municipal

<p style='text-align: justify;'>O Cerrado DPAT permite a visualização de estatísticas e camadas para cada um dos estados e 1.386 municípios do bioma Cerrado. Estes municípios podem ser selecionados por meio de uma busca rápida localizada na “Camada de Dados”. Assim, um zoom é aplicado para a área de interesse, junto com estatísticas referentes à série histórica dos dados PRODES-Cerrado, uso e cobertura do solo no ano de 2013 (dados Terraclass Cerrado), e área agrícola mapeada durante a safra 2013/14 (dados Agrosatélite). Além dos dados previamente carregados, destaca-se também a possibilidade da ativação de todas as camadas de dados (e.g., declividade, solos, susceptibilidade ao desmatamento, precipitação, unidades de conservação, terras indígenas, terras quilombolas, dados do CAR, florestas plantadas, silos e armazéns, rodovias e frigoríficos pertencentes ao sistema de inspeção federal).</p>

![ Visualização de dados em nível municipal.](imgs/01/nivelmunicipal.jpg)
<p style='text-align: center;'><i>Visualização em nível municipal.</i></p>

## Upload de dados geográficos  

<p style='text-align: justify;'>Considerando as necessidades específicas de cada usuário da ferramenta Cerrado DPAT, a aba “Upload” (localizada na “Camada de Dados”) permite a submissão de arquivos shapefile e geojson (compactados em .zip) ou .kml e .kmz (produzidos pelo Google Earth). Após a submissão do arquivo espacial, os limites da área de interesse já podem ser visualizados no mapa. Um token, numérico e em QR Code, também é criado para eventuais compartilhamentos.</p>

![ Visualização de dados em nível municipal.](imgs/01/uploaddadosqrcode.jpg)






