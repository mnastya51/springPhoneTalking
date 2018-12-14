package com.mkyong.web.models;

import javax.persistence.*;

@Entity
public class Talking {
    private int talkid;
    private String cost;
    private Integer kolmin;
    private String talktime;
    private Abonent abonentByAbonentid;
    private City cityByCityid;

    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    @Column(name = "talkid", nullable = false)
    public int getTalkid() {
        return talkid;
    }

    public void setTalkid(int talkid) {
        this.talkid = talkid;
    }

    @Basic
    @Column(name = "cost", nullable = true)
    public String getCost() {
        return cost;
    }

    public void setCost(String cost) {
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
    @Column(name = "talktime", nullable = true)
    public String getTalktime() {
        return talktime;
    }

    public void setTalktime(String talktime) {
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
        if (talktime != null ? !talktime.equals(talking.talktime) : talking.talktime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = talkid;
        result = 31 * result + (cost != null ? cost.hashCode() : 0);
        result = 31 * result + (kolmin != null ? kolmin.hashCode() : 0);
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
