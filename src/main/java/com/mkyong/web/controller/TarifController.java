package com.mkyong.web.controller;

import com.google.gson.Gson;
import com.mkyong.web.dao.DaoTarif;
import com.mkyong.web.models.Tarif;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TarifController {
    @RequestMapping(value = "/getTarif", method = RequestMethod.GET)
    public String getTarif() {
        List<Tarif> list = DaoTarif.getTarif();
        return list != null ? new Gson().toJson(list) : null;
    }

    @RequestMapping(value = "/addTarif", params = {"mincost", "cityid", "periodstart","periodend"}, method = RequestMethod.GET)
    public Boolean addDiscount(@RequestParam("mincost") String mincost,
                               @RequestParam("cityid") String cityid,
                               @RequestParam("periodstart") String periodstart,
                               @RequestParam("periodend") String periodend) {
        return DaoTarif.insertTarif(mincost, cityid, periodstart, periodend);
    }

//    @RequestMapping(value = "/editDiscount", params = {"amountdiscount", "cityid", "discountid"}, method = RequestMethod.GET)
//    public Boolean updateDiscount(@RequestParam("amountdiscount") String amountdiscount,
//                                  @RequestParam("cityid") String cityid,
//                                  @RequestParam("discountid") String discountid) {
//        return DaoDiscount.updateDiscount(Integer.valueOf(amountdiscount),  cityid, Integer.valueOf(discountid));
//    }
//
//    @RequestMapping(value = "/deleteDiscount", params = "discountid", method = RequestMethod.GET)
//    public Boolean deletDiscount(@RequestParam("discountid") String discountid) {
//        return DaoDiscount.deleteDiscount(Integer.valueOf(discountid));
//    }
}