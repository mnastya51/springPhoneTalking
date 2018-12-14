package com.mkyong.web.dao;

import com.mkyong.web.models.Abonent;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

public class DaoAbonent {
    public static List<Abonent> getAbonent() {
        EntityManager em = Dao
                .getInstance()
                .getEntityManager();
        Query q = em.createQuery("SELECT item FROM Abonent item order by item.abonentid");
        List resultList = q.getResultList();
        if (resultList.size() == 0) {
            return null;
        } else {
            return resultList;
        }
    }
    public static Boolean insertAbonent(String fio, String phone, String address, String passsport) {
        EntityManager em = Dao
                .getInstance()
                .getEntityManager();
        em.getTransaction().begin();
        Abonent abonent = new Abonent();
        abonent.setFio(fio);
        abonent.setPhone(phone);
        abonent.setAddress(address);
        abonent.setPassport(passsport);
        try {
            em.persist(abonent);
            em.getTransaction().commit();
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    public static Boolean updateAbonent(String fio, String phone, String address, String passsport, int abonentid) {
        EntityManager em = Dao
                .getInstance()
                .getEntityManager();
        Abonent abonent = em.find(Abonent.class, abonentid);
        if (abonent != null) {
            em.getTransaction().begin();
            try {
                abonent.setFio(fio);
                abonent.setPhone(phone);
                abonent.setAddress(address);
                abonent.setPassport(passsport);
                em.getTransaction().commit();
            } catch (Exception e) {
                return false;
            }
            return true;
        } else return false;
    }

    public static Boolean deleteAbonent(int abonentId) {
        EntityManager em = Dao
                .getInstance()
                .getEntityManager();
        Abonent abonent = em.find(Abonent.class, abonentId);
        if (abonent != null) {
            em.getTransaction().begin();
            try {
                em.remove(abonent);
                em.getTransaction().commit();
            } catch (Exception e) {
                return false;
            }
            return true;
        } else return false;
    }
}
