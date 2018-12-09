package com.mkyong.web.dao;

import com.mkyong.web.models.City;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

public class DaoCity {
    public static List<City> getCityFromDao() {
        EntityManager em = Dao
                .getInstance()
                .getEntityManager();
        Query q = em.createQuery("SELECT item FROM City item");
        List resultList = q.getResultList();
        em.close();
        if (resultList.size() == 0) {
            return null;
        } else {
            return resultList;
        }
    }

    public static Boolean insertCityToDao(String cityName) {
        EntityManager em = Dao
                .getInstance()
                .getEntityManager();
        em.getTransaction().begin();
        City city = new City();
        city.setCityname(cityName);
        try {
            em.persist(city);
            em.getTransaction().commit();
        } catch (Exception e) {
            em.close();
            return false;
        }
        em.close();
        return true;
    }
}
