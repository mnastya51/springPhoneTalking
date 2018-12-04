package com.mkyong.web.dao;

import com.mkyong.web.models.Users;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import java.util.List;

public class DaoUser {
    public static Users getUserFromDao(String username) {
        Query q = Dao
                .getInstance()
                .getEntityManager()
                .createQuery("SELECT item FROM Users item where item.username = :username");
        q.setParameter("username", username);
        List resultList = q.getResultList();
        if (resultList.size() == 0) {
            return null;
        } else {
            return (Users) resultList.get(0);
        }
    }
    public static void insertUserFromDao(String username, String password) {
        EntityManager em = Dao
                .getInstance()
                .getEntityManager();
        em.getTransaction().begin();
        Users user = new Users();
        user.setUsername(username);
        user.setPassword(new BCryptPasswordEncoder().encode(password));
        em.persist(user);
        em.getTransaction().commit();
    }
}
