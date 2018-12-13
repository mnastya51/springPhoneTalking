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

  /*  public static Boolean updateDiscount(int amountdiscount, String cityid, int discountid) {
        EntityManager em = Dao
                .getInstance()
                .getEntityManager();
        City city = em.find(City.class, cityid);
        Discount discount = em.find(Discount.class, discountid);
        if (discount != null && city != null) {
            em.getTransaction().begin();
            try {
                discount.setAmountdiscount(amountdiscount);
                discount.setCityByCityid(city);
                discount.setDiscountid(discountid);
                em.getTransaction().commit();
            } catch (Exception e) {
                return false;
            }
            return true;
        } else return false;
    }

    public static Boolean deleteDiscount(int discountid) {
        EntityManager em = Dao
                .getInstance()
                .getEntityManager();
        Discount discount = em.find(Discount.class, discountid);
        if (discount != null) {
            em.getTransaction().begin();
            try {
                em.remove(discount);
                em.getTransaction().commit();
            } catch (Exception e) {
                return false;
            }
            return true;
        } else return false;
    }*/
}
