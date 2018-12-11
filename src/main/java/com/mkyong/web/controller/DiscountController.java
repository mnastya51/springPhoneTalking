package com.mkyong.web.controller;
import com.google.gson.Gson;
import com.mkyong.web.dao.DaoDiscount;
import com.mkyong.web.models.Discount;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DiscountController {
    @RequestMapping(value = "/getDiscounts", method = RequestMethod.GET)
    public String getAbonents() {
        List<Discount> list = DaoDiscount.getDiscount();
        return list != null ? new Gson().toJson(list) : null;
    }

    @RequestMapping(value = "/addDiscount", params = {"amountdiscount", "cityid"}, method = RequestMethod.GET)
    public Boolean addDiscount(@RequestParam("amountdiscount") String amountdiscount,
                           @RequestParam("cityid") String cityid) {
        return DaoDiscount.insertDiscount(Integer.valueOf(amountdiscount), cityid);
    }

//    @RequestMapping(value = "/editAbonent", params = {"fio", "phone", "address", "passport", "abonentid"}, method = RequestMethod.GET)
//    public Boolean addCity(@RequestParam("fio") String fio,
//                           @RequestParam("phone") String phone,
//                           @RequestParam("address") String address,
//                           @RequestParam("passport") String passport,
//                           @RequestParam("abonentid") String abonentid) {
//        return DaoAbonent.updateAbonent(fio, phone, address, passport, Integer.valueOf(abonentid));
//    }
//
//    @RequestMapping(value = "/deleteAbonent", params = "abonentid", method = RequestMethod.GET)
//    public Boolean deleteCity(@RequestParam("abonentid") String abonentid) {
//        return DaoAbonent.deleteAbonent(Integer.valueOf(abonentid));
//    }
}