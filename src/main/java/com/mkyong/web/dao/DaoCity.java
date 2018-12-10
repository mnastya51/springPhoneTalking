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
            return false;
        }
        return true;
    }

    public static Boolean deleteCity(int cityId) {
        EntityManager em = Dao
                .getInstance()
                .getEntityManager();
        City city = em.find(City.class, cityId);
        if (city != null) {
            em.getTransaction().begin();
            try {
                em.remove(city);
                em.getTransaction().commit();
            } catch (Exception e) {
                return false;
            }
            return true;
        } else return false;
    }
}
