package com.mkyong.web.dao;

import com.mkyong.web.models.City;
import com.mkyong.web.models.Tarif;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

public class DaoTarif {
    public static List<Tarif> getTarif() {
        EntityManager em = Dao
                .getInstance()
                .getEntityManager();
        Query q = em.createQuery("SELECT d FROM Tarif d");
        List resultList = q.getResultList();
        if (resultList.size() == 0) {
            return null;
        } else {
            return resultList;
        }
    }
    public static Boolean insertTarif(String mincost, String cityid, String periodstart, String periodend) {
        EntityManager em = Dao
                .getInstance()
                .getEntityManager();
        City city = em.find(City.class, cityid);
        if (city != null) {
            Tarif tarif = new Tarif();
            tarif.setMincost(mincost);
            tarif.setPeriodstart(periodstart);
            tarif.setPeriodend(periodend);
            tarif.setCityByCityid(city);
            em.getTransaction().begin();
            try {
                em.persist(tarif);
                em.getTransaction().commit();
            } catch (Exception e) {
                return false;
            }
        } else return false;
        return true;
    }

    public static Boolean updateTarif(String mincost, String periodstart, String periodend, String cityid, int tarifid) {
        EntityManager em = Dao
                .getInstance()
                .getEntityManager();
        City city = em.find(City.class, cityid);
        Tarif tarif = em.find(Tarif.class, tarifid);
        if (tarif != null && city != null) {
            em.getTransaction().begin();
            try {
                tarif.setMincost(mincost);
                tarif.setCityByCityid(city);
                tarif.setPeriodend(periodend);
                tarif.setPeriodstart(periodstart);
                em.getTransaction().commit();
            } catch (Exception e) {
                return false;
            }
            return true;
        } else return false;
    }

    public static Boolean deleteTarif(int tarifid) {
        EntityManager em = Dao
                .getInstance()
                .getEntityManager();
        Tarif tarif = em.find(Tarif.class, tarifid);
        if (tarif != null) {
            em.getTransaction().begin();
            try {
                em.remove(tarif);
                em.getTransaction().commit();
            } catch (Exception e) {
                return false;
            }
            return true;
        } else return false;
    }
}
