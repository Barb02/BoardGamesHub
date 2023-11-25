package com.pt.ua.boardgameshub.domain.cassandra_domain;

import java.io.Serializable;
import java.util.Date;

import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.cql.Ordering;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyClass;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;

@PrimaryKeyClass
public class PriceHistoryKey implements Serializable {

	@PrimaryKeyColumn(name = "game_id", ordinal = 0, type = PrimaryKeyType.PARTITIONED)
	private Long gameId;

	@PrimaryKeyColumn(name = "changed_at", ordinal = 1, type = PrimaryKeyType.CLUSTERED, ordering = Ordering.DESCENDING)
	private Date changedAt;

	public Long getGameId() {
		return gameId;
	}

	public void setGameId(Long gameId) {
		this.gameId = gameId;
	}

	public Date getChangedAt() {
		return changedAt;
	}

	public void setChangedAt(Date changedAt) {
		this.changedAt = changedAt;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((changedAt == null) ? 0 : changedAt.hashCode());
		result = prime * result + ((gameId == null) ? 0 : gameId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PriceHistoryKey other = (PriceHistoryKey) obj;
		if (changedAt == null) {
			if (other.changedAt != null)
			return false;
		} else if (!changedAt.equals(other.changedAt))
			return false;
		if (gameId == null) {
			if (other.gameId != null)
			return false;
		} else if (!gameId.equals(other.gameId))
			return false;
		return true;
	}
}

