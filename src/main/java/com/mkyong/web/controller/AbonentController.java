package com.mkyong.web.controller;
import com.google.gson.Gson;
import com.mkyong.web.dao.DaoAbonent;
import com.mkyong.web.models.Abonent;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AbonentController {
    //    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value = "/getAbonents", method = RequestMethod.GET)
    public String getAbonents() {
        List<Abonent> list = DaoAbonent.getAbonent();
        return list != null ? new Gson().toJson(list) : null;
    }

    @RequestMapping(value = "/addAbonent", params = {"fio", "phone", "address", "passport"}, method = RequestMethod.GET)
    public Boolean addCity(@RequestParam("fio") String fio,
                           @RequestParam("phone") String phone,
                           @RequestParam("address") String address,
                           @RequestParam("passport") String passport) {
        return DaoAbonent.insertAbonent(fio, phone, address, passport);
    }

    @RequestMapping(value = "/editAbonent", params = {"fio", "phone", "address", "passport", "abonentid"}, method = RequestMethod.GET)
    public Boolean addCity(@RequestParam("fio") String fio,
                           @RequestParam("phone") String phone,
                           @RequestParam("address") String address,
                           @RequestParam("passport") String passport,
                           @RequestParam("abonentid") String abonentid) {
        return DaoAbonent.updateAbonent(fio, phone, address, passport, Integer.valueOf(abonentid));
    }

   @RequestMapping(value = "/deleteAbonent", params = "abonentid", method = RequestMethod.GET)
    public Boolean deleteCity(@RequestParam("abonentid") String abonentid) {
        return DaoAbonent.deleteAbonent(Integer.valueOf(abonentid));
    }
}