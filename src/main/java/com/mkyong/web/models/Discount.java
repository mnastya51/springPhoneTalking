package com.mkyong.web.models;

import javax.persistence.*;

@Entity
public class Discount {
    private int discountid;
    private int duration;
    private int amountdiscount;
    private City cityByCityid;

    @Id
    @Column(name = "discountid", nullable = false)
    public int getDiscountid() {
        return discountid;
    }

    public void setDiscountid(int discountid) {
        this.discountid = discountid;
    }

    @Basic
    @Column(name = "duration", nullable = false)
    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    @Basic
    @Column(name = "amountdiscount", nullable = false)
    public int getAmountdiscount() {
        return amountdiscount;
    }

    public void setAmountdiscount(int amountdiscount) {
        this.amountdiscount = amountdiscount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Discount discount = (Discount) o;

        if (discountid != discount.discountid) return false;
        if (duration != discount.duration) return false;
        if (amountdiscount != discount.amountdiscount) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = discountid;
        result = 31 * result + duration;
        result = 31 * result + amountdiscount;
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
