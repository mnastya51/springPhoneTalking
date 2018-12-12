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

    @RequestMapping(value = "/editDiscount", params = {"amountdiscount", "cityid", "discountid"}, method = RequestMethod.GET)
    public Boolean updateDiscount(@RequestParam("amountdiscount") String amountdiscount,
                           @RequestParam("cityid") String cityid,
                           @RequestParam("discountid") String discountid) {
        return DaoDiscount.updateDiscount(Integer.valueOf(amountdiscount),  cityid, Integer.valueOf(discountid));
    }

    @RequestMapping(value = "/deleteDiscount", params = "discountid", method = RequestMethod.GET)
    public Boolean deletDiscount(@RequestParam("discountid") String discountid) {
        return DaoDiscount.deleteDiscount(Integer.valueOf(discountid));
    }
}