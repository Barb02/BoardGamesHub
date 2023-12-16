CREATE OR REPLACE FUNCTION GetLatestPricesForGame(gid bigint) RETURNS SETOF Price AS $$
BEGIN
    RETURN QUERY
    SELECT p.id, p.price, p.timestamp, p.game_id, p.store_id
    FROM price p
    INNER JOIN (
        SELECT price.store_id, MAX(timestamp) AS latest_timestamp
        FROM price
        WHERE price.game_id = gid
        GROUP BY price.store_id
    ) latest ON p.store_id = latest.store_id AND p.timestamp = latest.latest_timestamp
    WHERE p.game_id = gid;
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION GetLowestPriceForGame(gid integer) RETURNS SETOF Price AS $$
BEGIN
    RETURN QUERY
    SELECT id, p.price, p.timestamp, p.game_id, p.store_id FROM GetLatestPricesForGame(gid) as p order by price asc limit 1;
END;
$$
LANGUAGE PLPGSQL;
