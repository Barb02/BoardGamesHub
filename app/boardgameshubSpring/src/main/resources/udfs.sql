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

CREATE OR REPLACE FUNCTION GetLowestPriceForGame(gid bigint) RETURNS SETOF Price AS $$
BEGIN
    RETURN QUERY
    SELECT id, p.price, p.timestamp, p.game_id, p.store_id FROM GetLatestPricesForGame(gid) as p order by price asc limit 1;
END;
$$
LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION GetPriceHistory(gid bigint) RETURNS SETOF Price AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT ON (date_trunc('minute', p.timestamp), p.store_id) *
    FROM price as p
    WHERE game_id = gid
    ORDER BY date_trunc('minute', p.timestamp), p.store_id, p.price;
END;
$$ LANGUAGE PLPGSQL;