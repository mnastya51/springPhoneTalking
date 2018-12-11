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
        Query q = em.createQuery("SELECT d FROM Discount d");
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

//    public static Boolean updateAbonent(String fio, String phone, String address, String passsport, int abonentid) {
//        EntityManager em = Dao
//                .getInstance()
//                .getEntityManager();
//        Abonent abonent = em.find(Abonent.class, abonentid);
//        if (abonent != null) {
//            em.getTransaction().begin();
//            try {
//                abonent.setFio(fio);
//                abonent.setPhone(phone);
//                abonent.setAddress(address);
//                abonent.setPassport(passsport);
//                em.getTransaction().commit();
//            } catch (Exception e) {
//                return false;
//            }
//            return true;
//        } else return false;
//    }
//
//    public static Boolean deleteAbonent(int abonentId) {
//        EntityManager em = Dao
//                .getInstance()
//                .getEntityManager();
//        Abonent abonent = em.find(Abonent.class, abonentId);
//        if (abonent != null) {
//            em.getTransaction().begin();
//            try {
//                em.remove(abonent);
//                em.getTransaction().commit();
//            } catch (Exception e) {
//                return false;
//            }
//            return true;
//        } else return false;
//    }
}
