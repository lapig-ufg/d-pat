
/* PROBIO */
update prodes_regions_lulc
set total_area_classe_lulc = internal.total_area_lulc
from
(select r.gid as id, lc.cd_geocmu as code, lc.classe as classeInt,  sum(st_area(lc.geom,true)/1000000.0::double precision) as total_area_lulc from uso_solo_probio lc
inner join regions r on lc.cd_geocmu = r.cd_geocmu group by 1,2,3) as internal
where prodes_regions_lulc = 'city' and prodes_regions_lulc.region_id = internal.id and prodes_regions_lulc.classe_lulc = internal.classeInt;


update prodes_regions_lulc
set total_area_classe_lulc = internal.total_area_lulc
from
(select r.gid as id, lc.cd_geocmu as code, lc.classe as classeInt,  sum(st_area(lc.geom,true)/1000000.0::double precision) as total_area_lulc from uso_solo_probio lc
inner join regions r on lc.cd_geocmu = r.cd_geocmu group by 1,2,3) as internal
where prodes_regions_lulc = 'state' and prodes_regions_lulc.region_id = internal.id and prodes_regions_lulc.classe_lulc = internal.classeInt;

/* TERRACLASS */
update prodes_regions_lulc
set total_area_classe_lulc = internal.total_area_lulc
from
(select r.gid as id, lc.cd_geocmu as code, lc.classe as classeInt,  sum(st_area(lc.geom,true)/1000000.0::double precision) as total_area_lulc from uso_solo_terraclass lc
inner join regions r on lc.cd_geocmu = r.cd_geocmu group by 1,2,3) as internal
where prodes_regions_lulc = 'city' and prodes_regions_lulc.region_id = internal.id and prodes_regions_lulc.classe_lulc = internal.classeInt;


update prodes_regions_lulc
set total_area_classe_lulc = internal.total_area_lulc
from
(select r.gid as id, lc.cd_geocmu as code, lc.classe as classeInt,  sum(st_area(lc.geom,true)/1000000.0::double precision) as total_area_lulc from uso_solo_terraclass lc
inner join regions r on lc.cd_geocmu = r.cd_geocmu group by 1,2,3) as internal
where prodes_regions_lulc = 'state' and prodes_regions_lulc.region_id = internal.id and prodes_regions_lulc.classe_lulc = internal.classeInt;

/* AGROSATELITE */
update prodes_regions_lulc
set total_area_classe_lulc = internal.total_area_lulc
from
(select r.gid as id, lc.cd_geocmu as code, lc.classe as classeInt,  sum(st_area(lc.geom,true)/1000000.0::double precision) as total_area_lulc from agricultura_agrosatelite lc
inner join regions r on lc.cd_geocmu = r.cd_geocmu group by 1,2,3) as internal
where prodes_regions_lulc = 'city' and prodes_regions_lulc.region_id = internal.id and prodes_regions_lulc.classe_lulc = internal.classeInt;


update prodes_regions_lulc
set total_area_classe_lulc = internal.total_area_lulc
from
(select r.gid as id, lc.cd_geocmu as code, lc.classe as classeInt,  sum(st_area(lc.geom,true)/1000000.0::double precision) as total_area_lulc from agricultura_agrosatelite lc
inner join regions r on lc.cd_geocmu = r.cd_geocmu group by 1,2,3) as internal
where prodes_regions_lulc = 'state' and prodes_regions_lulc.region_id = internal.id and prodes_regions_lulc.classe_lulc = internal.classeInt;
