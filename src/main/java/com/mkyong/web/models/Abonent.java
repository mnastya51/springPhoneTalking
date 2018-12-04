package com.mkyong.web.models;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Abonent {
    private int abonentid;
    private String phone;
    private String fio;
    private String address;
    private String passport;

    @Id
    @Column(name = "abonentid", nullable = false)
    public int getAbonentid() {
        return abonentid;
    }

    public void setAbonentid(int abonentid) {
        this.abonentid = abonentid;
    }

    @Basic
    @Column(name = "phone", nullable = true, length = 11)
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Basic
    @Column(name = "fio", nullable = false, length = 40)
    public String getFio() {
        return fio;
    }

    public void setFio(String fio) {
        this.fio = fio;
    }

    @Basic
    @Column(name = "address", nullable = true, length = 50)
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Basic
    @Column(name = "passport", nullable = true, length = 10)
    public String getPassport() {
        return passport;
    }

    public void setPassport(String passport) {
        this.passport = passport;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Abonent abonent = (Abonent) o;

        if (abonentid != abonent.abonentid) return false;
        if (phone != null ? !phone.equals(abonent.phone) : abonent.phone != null) return false;
        if (fio != null ? !fio.equals(abonent.fio) : abonent.fio != null) return false;
        if (address != null ? !address.equals(abonent.address) : abonent.address != null) return false;
        if (passport != null ? !passport.equals(abonent.passport) : abonent.passport != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = abonentid;
        result = 31 * result + (phone != null ? phone.hashCode() : 0);
        result = 31 * result + (fio != null ? fio.hashCode() : 0);
        result = 31 * result + (address != null ? address.hashCode() : 0);
        result = 31 * result + (passport != null ? passport.hashCode() : 0);
        return result;
    }
}
