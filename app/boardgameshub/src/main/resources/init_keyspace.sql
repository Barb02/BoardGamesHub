CREATE KEYSPACE IF NOT EXISTS springcassandra
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};