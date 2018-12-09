package com.mkyong.web.models;

import javax.persistence.*;

@Entity
@Table(name = "city")
public class City {
    private int cityid;
    private String cityname;

    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    @Column(name = "cityid", nullable = false)
    public int getCityid() {
        return cityid;
    }

    public void setCityid(int cityid) {
        this.cityid = cityid;
    }

    @Basic
    @Column(name = "cityname", nullable = false, length = 20)
    public String getCityname() {
        return cityname;
    }

    public void setCityname(String cityname) {
        this.cityname = cityname;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        City city = (City) o;

        if (cityid != city.cityid) return false;
        if (cityname != null ? !cityname.equals(city.cityname) : city.cityname != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = cityid;
        result = 31 * result + (cityname != null ? cityname.hashCode() : 0);
        return result;
    }
}
