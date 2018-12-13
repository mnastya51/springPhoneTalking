package com.mkyong.web.models;

import javax.persistence.*;

@Entity
public class Tarif {
    private int tarifid;
    private String periodstart;
    private String periodend;
    private String mincost;
    private City cityByCityid;

    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    @Column(name = "tarifid", nullable = false)
    public int getTarifid() {
        return tarifid;
    }

    public void setTarifid(int tarifid) {
        this.tarifid = tarifid;
    }

    @Basic
    @Column(name = "periodstart", nullable = false)
    public String getPeriodstart() {
        return periodstart;
    }

    public void setPeriodstart(String periodstart) {
        this.periodstart = periodstart;
    }

    @Basic
    @Column(name = "periodend", nullable = false)
    public String getPeriodend() {
        return periodend;
    }

    public void setPeriodend(String periodend) {
        this.periodend = periodend;
    }

    @Basic
    @Column(name = "mincost", nullable = true, precision = 0)
    public String getMincost() {
        return mincost;
    }

    public void setMincost(String mincost) {
        this.mincost = mincost;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Tarif tarif = (Tarif) o;

        if (tarifid != tarif.tarifid) return false;
        if (periodstart != null ? !periodstart.equals(tarif.periodstart) : tarif.periodstart != null) return false;
        if (periodend != null ? !periodend.equals(tarif.periodend) : tarif.periodend != null) return false;
        if (mincost != null ? !mincost.equals(tarif.mincost) : tarif.mincost != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = tarifid;
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
