package com.mkyong.web;
import com.mkyong.web.models.City;

import javax.persistence.*;

public class Main {
    public static void main(String[] args) {
        EntityManagerFactory factory = Persistence.
                createEntityManagerFactory("NewPersistenceUnit", System.getProperties());

        EntityManager em = factory.createEntityManager();

        Query q = em.createQuery("SELECT item FROM City item");

        City city = (City) q.getResultList().get(0);

        String t = city.getCityname();

        System.out.println(city.getCityid() + " " + city.getCityname());
    }
}

