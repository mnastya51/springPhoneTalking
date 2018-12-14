package com.mkyong.web.dao;

import com.mkyong.web.models.Abonent;
import com.mkyong.web.models.City;
import com.mkyong.web.models.Talking;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

public class DaoTalking {
    public static List<Talking> getTalking() {
        EntityManager em = Dao
                .getInstance()
                .getEntityManager();
        Query q = em.createQuery("SELECT d FROM Talking d order by d.talkid");
        List resultList = q.getResultList();
        if (resultList.size() == 0) {
            return null;
        } else {
            return resultList;
        }
    }
    public static Boolean insertTalking(String cost, String cityid, String abonentid, String period, int kolmin) {
        EntityManager em = Dao
                .getInstance()
                .getEntityManager();
        City city = em.find(City.class, cityid);
        Abonent abonent = em.find(Abonent.class, abonentid);
        if (city != null && abonent != null) {
            Talking talking = new Talking();
            talking.setCost(cost);
            talking.setAbonentByAbonentid(abonent);
            talking.setTalktime(period);
            talking.setKolmin(kolmin);
            talking.setCityByCityid(city);
            em.getTransaction().begin();
            try {
                em.persist(talking);
                em.getTransaction().commit();
            } catch (Exception e) {
                return false;
            }
        } else return false;
        return true;
    }

    public static Boolean updateTalking(String cost, String cityid, String abonentid, String period, int kolmin, int talkid) {
        EntityManager em = Dao
                .getInstance()
                .getEntityManager();
        City city = em.find(City.class, cityid);
        Abonent abonent = em.find(Abonent.class, abonentid);
        Talking talking = em.find(Talking.class, talkid);
        if (talking != null && city != null && abonent != null) {
            em.getTransaction().begin();
            try {
                talking.setKolmin(kolmin);
                talking.setCityByCityid(city);
                talking.setTalktime(period);
                talking.setAbonentByAbonentid(abonent);
                talking.setCost(cost);
                em.getTransaction().commit();
            } catch (Exception e) {
                return false;
            }
            return true;
        } else return false;
    }

    public static Boolean deleteTalking(int talkingid) {
        EntityManager em = Dao
                .getInstance()
                .getEntityManager();
        Talking talking = em.find(Talking.class, talkingid);
        if (talking != null) {
            em.getTransaction().begin();
            try {
                em.remove(talking);
                em.getTransaction().commit();
            } catch (Exception e) {
                return false;
            }
            return true;
        } else return false;
    }
}
