package com.mkyong.web.dao;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class Dao {
    private static Dao instance;
    private EntityManagerFactory factory;
    private EntityManager entityManager;

    public static Dao getInstance() {
        if (instance == null) {
            instance = new Dao();
        }
        return instance;
    }

    private Dao() {
        factory = Persistence.
                createEntityManagerFactory("NewPersistenceUnit", System.getProperties());

        entityManager = factory.createEntityManager();
    }

    public EntityManagerFactory getFactory() {
        return factory;
    }

    public EntityManager getEntityManager() {
        return entityManager;
    }
}
