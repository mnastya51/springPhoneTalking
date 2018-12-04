package com.mkyong.web.models;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

@Entity
public class Talking {
    private int talkid;
    private Float cost;
    private Integer kolmin;
    private Date talkdate;
    private Time talktime;
    private Abonent abonentByAbonentid;
    private City cityByCityid;

    @Id
    @Column(name = "talkid", nullable = false)
    public int getTalkid() {
        return talkid;
    }

    public void setTalkid(int talkid) {
        this.talkid = talkid;
    }

    @Basic
    @Column(name = "cost", nullable = true, precision = 0)
    public Float getCost() {
        return cost;
    }

    public void setCost(Float cost) {
        this.cost = cost;
    }

    @Basic
    @Column(name = "kolmin", nullable = true)
    public Integer getKolmin() {
        return kolmin;
    }

    public void setKolmin(Integer kolmin) {
        this.kolmin = kolmin;
    }

    @Basic
    @Column(name = "talkdate", nullable = true)
    public Date getTalkdate() {
        return talkdate;
    }

    public void setTalkdate(Date talkdate) {
        this.talkdate = talkdate;
    }

    @Basic
    @Column(name = "talktime", nullable = true)
    public Time getTalktime() {
        return talktime;
    }

    public void setTalktime(Time talktime) {
        this.talktime = talktime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Talking talking = (Talking) o;

        if (talkid != talking.talkid) return false;
        if (cost != null ? !cost.equals(talking.cost) : talking.cost != null) return false;
        if (kolmin != null ? !kolmin.equals(talking.kolmin) : talking.kolmin != null) return false;
        if (talkdate != null ? !talkdate.equals(talking.talkdate) : talking.talkdate != null) return false;
        if (talktime != null ? !talktime.equals(talking.talktime) : talking.talktime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = talkid;
        result = 31 * result + (cost != null ? cost.hashCode() : 0);
        result = 31 * result + (kolmin != null ? kolmin.hashCode() : 0);
        result = 31 * result + (talkdate != null ? talkdate.hashCode() : 0);
        result = 31 * result + (talktime != null ? talktime.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "abonentid", referencedColumnName = "abonentid", nullable = false)
    public Abonent getAbonentByAbonentid() {
        return abonentByAbonentid;
    }

    public void setAbonentByAbonentid(Abonent abonentByAbonentid) {
        this.abonentByAbonentid = abonentByAbonentid;
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
