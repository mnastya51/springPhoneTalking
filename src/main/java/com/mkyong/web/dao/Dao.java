package com.mkyong.web.dao;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class Dao {
    private static Dao instance;
    private EntityManagerFactory factory;

    public static Dao getInstance() {
        if (instance == null) {
            instance = new Dao();
        }
        return instance;
    }

    private Dao() {
        factory = Persistence.
                createEntityManagerFactory("NewPersistenceUnit", System.getProperties());
    }

    public EntityManagerFactory getFactory() {
        return factory;
    }

    public EntityManager getEntityManager() {
        return factory.createEntityManager();
    }

    @Override
    protected void finalize() throws Throwable {
        super.finalize();
        factory.close();
    }
}
