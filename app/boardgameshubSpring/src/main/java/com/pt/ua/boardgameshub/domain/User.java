package com.pt.ua.boardgameshub.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.EnumType;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.pt.ua.boardgameshub.dao.request_body.SignUpRequest;

import java.util.Collection;
import java.util.List;


@Entity
@Table(name = "_user")
public class User implements UserDetails{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    private Role role;

    public User() {
    }
    
    public User(SignUpRequest request, PasswordEncoder passwordEncoder) {
        this.name = request.getUsername();
        this.password = passwordEncoder.encode(request.getPassword());
        this.email = request.getEmail();
        this.role = Role.USER;
    }

    @Override
    public String getUsername() {
        return email; // email vai ser usado para autenticação e autorização
    }

    public void setName(String name){
        this.name = name;
    }

    public String getName(){
        return name;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    @Override
    public String getPassword() {
        return password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Role getRole(){
        return role;
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }
}
