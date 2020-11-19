CREATE OR REPLACE FUNCTION public.rect_bbox(geometry) RETURNS box2d LANGUAGE sql AS $function$
SELECT ST_EXTENT(
        ST_BUFFER(ST_ENVELOPE($1)::geography, 1000)::geometry
    ) $function$
CREATE OR REPLACE FUNCTION public.safe_intersection(geom_a geometry, geom_b geometry) RETURNS geometry LANGUAGE plpgsql STABLE STRICT AS $function$ BEGIN RETURN ST_Intersection(geom_a, geom_b);
EXCEPTION
WHEN OTHERS THEN BEGIN RETURN ST_Intersection(
    ST_Buffer(geom_a, 0.0000001),
    ST_Buffer(geom_b, 0.0000001)
);
EXCEPTION
WHEN OTHERS THEN RETURN ST_GeomFromText('POLYGON EMPTY');
END;
END $function$ CREATE MATERIALIZED VIEW public.desmat_on_rl AS
SELECT p.county AS name,
    upper(p.uf::text) AS uf,
    p.year,
    sum(
        st_area(safe_intersection(p.geom, rl.geom)::geography) / 1000000.0::double precision
    ) AS value
FROM car_desmat c
    JOIN geo_car_reserva_legal_cerrado rl ON rl.idt_imovel = c.idt_imovel
    JOIN prodes_cerrado p ON p.gid = c.prodes_id
WHERE p.year >= 2013
GROUP BY p.county,
    (upper(p.uf::text)),
    p.year
ORDER BY (
        sum(
            st_area(safe_intersection(p.geom, rl.geom)::geography) / 1000000.0::double precision
        )
    ) DESC WITH DATA;
CREATE MATERIALIZED VIEW public.desmat_on_app AS
SELECT p.county AS name,
    upper(p.uf::text) AS uf,
    p.year,
    sum(
        st_area(safe_intersection(p.geom, app.geom)::geography) / 1000000.0::double precision
    ) AS value
FROM car_desmat c
    JOIN geo_car_app_cerrado app ON app.idt_imovel = c.idt_imovel
    JOIN prodes_cerrado p ON p.gid = c.prodes_id
WHERE p.year >= 2013
GROUP BY p.county,
    (upper(p.uf::text)),
    p.year
ORDER BY (
        sum(
            st_area(safe_intersection(p.geom, app.geom)::geography) / 1000000.0::double precision
        )
    ) DESC WITH DATA;