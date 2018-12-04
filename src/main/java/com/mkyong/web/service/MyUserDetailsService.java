package com.mkyong.web.service;

import com.mkyong.web.dao.DaoUser;
import com.mkyong.web.models.Users;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service("userDetailsService")
public class MyUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(final String username)
            throws UsernameNotFoundException {

        Users user = DaoUser.getUserFromDao(username);

        if (user == null) {
            throw new UsernameNotFoundException("Пользователь не найден");
        } else {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
           // return new MySpringUser(user.getUsername(), encoder.encode(user.getPassword()));
            return new MySpringUser(user.getUsername(), user.getPassword());
        }
    }

    private static class MySpringUser implements UserDetails {
        private String username;
        private String password;

        public MySpringUser(String username, String password) {
            this.username = username;
            this.password = password;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public String getUsername() {
            return username;
        }

        @Override
        public String getPassword() {
            return password;
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            List<SimpleGrantedAuthority> auths = new java.util.ArrayList<SimpleGrantedAuthority>();
            if (getUsername().equals("admin")) auths.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
            auths.add(new SimpleGrantedAuthority("OTHER"));
            return auths;
        }
    }

}