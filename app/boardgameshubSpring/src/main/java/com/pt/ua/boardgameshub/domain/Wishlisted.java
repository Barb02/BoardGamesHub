package com.pt.ua.boardgameshub.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.JoinColumn;

import java.sql.Timestamp;

@Getter
@Setter
@Entity
@Table(name = "wishlisted", uniqueConstraints= @UniqueConstraint(name="uniqueUserAndGame", columnNames = {"user_id", "game_id"}))
public class Wishlisted {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="game_id")
    private Game game;

    @Column
    private Timestamp insertionDate;
    
}
