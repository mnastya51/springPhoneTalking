package com.mkyong.web.models;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.sql.Time;

public class TarifPK implements Serializable {
    private int cityid;
    private Time periodstart;
    private Time periodend;

    @Column(name = "cityid", nullable = false)
    @Id
    public int getCityid() {
        return cityid;
    }

    public void setCityid(int cityid) {
        this.cityid = cityid;
    }

    @Column(name = "periodstart", nullable = false)
    @Id
    public Time getPeriodstart() {
        return periodstart;
    }

    public void setPeriodstart(Time periodstart) {
        this.periodstart = periodstart;
    }

    @Column(name = "periodend", nullable = false)
    @Id
    public Time getPeriodend() {
        return periodend;
    }

    public void setPeriodend(Time periodend) {
        this.periodend = periodend;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TarifPK tarifPK = (TarifPK) o;

        if (cityid != tarifPK.cityid) return false;
        if (periodstart != null ? !periodstart.equals(tarifPK.periodstart) : tarifPK.periodstart != null) return false;
        if (periodend != null ? !periodend.equals(tarifPK.periodend) : tarifPK.periodend != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = cityid;
        result = 31 * result + (periodstart != null ? periodstart.hashCode() : 0);
        result = 31 * result + (periodend != null ? periodend.hashCode() : 0);
        return result;
    }
}
