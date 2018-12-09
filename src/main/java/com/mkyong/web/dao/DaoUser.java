package com.mkyong.web.dao;

import com.mkyong.web.models.Users;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

public class DaoUser {
    public static Users getUserFromDao(String username) {
        EntityManager em = Dao
                .getInstance()
                .getEntityManager();
        Query q = em.createQuery("SELECT item FROM Users item where item.username = :username");
        q.setParameter("username", username);
        List resultList = q.getResultList();
        em.close();
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
        em.close();
    }
}
