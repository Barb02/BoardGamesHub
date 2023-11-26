package com.pt.ua.boardgameshub.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.cassandra.config.AbstractCassandraConfiguration;
import org.springframework.data.cassandra.config.CqlSessionFactoryBean;
import org.springframework.data.cassandra.core.CassandraTemplate;
import org.springframework.data.cassandra.core.convert.CassandraConverter;
import org.springframework.data.cassandra.core.mapping.CassandraMappingContext;
import org.springframework.data.cassandra.repository.config.EnableCassandraRepositories;


import com.datastax.oss.driver.api.core.CqlSession;

@EnableCassandraRepositories(basePackages = { "com.pt.ua.boardgameshub.repository.cassandra_repo" })
@Configuration
public class CassandraConfig extends AbstractCassandraConfiguration {

    @Value("${spring.data.cassandra.contact-points}")
    private String contactPoints;

    @Value("${spring.data.cassandra.port}")
    private int port;

    @Value("${spring.data.cassandra.local-datacenter}")
    private String localDatacenter;

    @Override
    protected String getKeyspaceName() {
        return "springcassandra";
    }

    @Bean
    @Override
    public CqlSessionFactoryBean cassandraSession() {
        CqlSessionFactoryBean session = new CqlSessionFactoryBean();
        session.setContactPoints("cassandra"); 
        session.setKeyspaceName(getKeyspaceName());
        session.setLocalDatacenter("datacenter1");
        return session;
    }

    @Bean
    public CassandraTemplate cassandraTemplate(CqlSession cqlSession, CassandraConverter converter,
                                              CassandraMappingContext mappingContext) {
        return new CassandraTemplate(cqlSession, converter);
    }
}

