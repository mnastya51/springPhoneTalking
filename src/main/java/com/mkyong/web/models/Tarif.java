package com.mkyong.web.models;

import javax.persistence.*;
import java.sql.Time;

@Entity
@IdClass(TarifPK.class)
public class Tarif {
    private int cityid;
    private Time periodstart;
    private Time periodend;
    private Float mincost;
    private City cityByCityid;

    @Id
    @Column(name = "cityid", nullable = false)
    public int getCityid() {
        return cityid;
    }

    public void setCityid(int cityid) {
        this.cityid = cityid;
    }

    @Id
    @Column(name = "periodstart", nullable = false)
    public Time getPeriodstart() {
        return periodstart;
    }

    public void setPeriodstart(Time periodstart) {
        this.periodstart = periodstart;
    }

    @Id
    @Column(name = "periodend", nullable = false)
    public Time getPeriodend() {
        return periodend;
    }

    public void setPeriodend(Time periodend) {
        this.periodend = periodend;
    }

    @Basic
    @Column(name = "mincost", nullable = true, precision = 0)
    public Float getMincost() {
        return mincost;
    }

    public void setMincost(Float mincost) {
        this.mincost = mincost;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Tarif tarif = (Tarif) o;

        if (cityid != tarif.cityid) return false;
        if (periodstart != null ? !periodstart.equals(tarif.periodstart) : tarif.periodstart != null) return false;
        if (periodend != null ? !periodend.equals(tarif.periodend) : tarif.periodend != null) return false;
        if (mincost != null ? !mincost.equals(tarif.mincost) : tarif.mincost != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = cityid;
        result = 31 * result + (periodstart != null ? periodstart.hashCode() : 0);
        result = 31 * result + (periodend != null ? periodend.hashCode() : 0);
        result = 31 * result + (mincost != null ? mincost.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "cityid", referencedColumnName = "cityid", nullable = false)
    public City getCityByCityid() {
        return cityByCityid;
    }

    public void setCityByCityid(City cityByCityid) {
        this.cityByCityid = cityByCityid;
    }
}
