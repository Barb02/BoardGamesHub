CREATE FUNCTION GetLatestPricesForGame(gid bigint)  RETURNS table(game_id bigint, store_id bigint, price double precision, tstamp timestamp) AS $$
BEGIN
RETURN QUERY
    SELECT
        gp.game_id,
        gp.store_id,
        gp.price,
        gp.timestamp
    FROM
        price gp
    INNER JOIN
        (
            SELECT
                price.store_id,
                MAX(timestamp) AS latest_timestamp
            FROM
                price
            WHERE
                price.game_id = gid
            GROUP BY
                price.store_id
        ) latest
    ON
        gp.store_id = latest.store_id
        AND gp.timestamp = latest.latest_timestamp
    WHERE
        gp.game_id = gid
;
END; $$
LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION GetLowestPriceForGame(gid bigint) RETURNS double precision AS $$
declare
   min_price double precision;
begin
    SELECT price into min_price FROM GetLatestPricesForGame(gid) order by price asc limit 1;
    return min_price;
end;
$$
LANGUAGE PLPGSQL;
