package com.mkyong.web.dao;

import com.mkyong.web.models.City;
import com.mkyong.web.models.Discount;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

public class DaoDiscount {
    public static List<Discount> getDiscount() {
        EntityManager em = Dao
                .getInstance()
                .getEntityManager();
        Query q = em.createQuery("SELECT d FROM Discount d order by d.discountid");
        List resultList = q.getResultList();
        if (resultList.size() == 0) {
            return null;
        } else {
            return resultList;
        }
    }
    public static Boolean insertDiscount(int amountdiscount, String cityid) {
        EntityManager em = Dao
                .getInstance()
                .getEntityManager();
        City city = em.find(City.class, cityid);
        if (city != null) {
            Discount discount = new Discount();
            discount.setAmountdiscount(amountdiscount);
            discount.setCityByCityid(city);
            em.getTransaction().begin();
            try {
                em.persist(discount);
                em.getTransaction().commit();
            } catch (Exception e) {
                return false;
            }
        } else return false;
        return true;
    }

    public static Boolean updateDiscount(int amountdiscount, String cityid, int discountid) {
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
    }
}
