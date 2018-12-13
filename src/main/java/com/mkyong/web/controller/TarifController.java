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
    @RequestMapping(value = "/getTarif", method = RequestMethod.GET, produces = "text/plain;charset=UTF-8")
    public String getTarif() {
        List<Tarif> list = DaoTarif.getTarif();
        return list != null ? new Gson().toJson(list) : null;
    }

    @RequestMapping(value = "/addTarif", params = {"mincost", "cityid", "periodstart","periodend"}, method = RequestMethod.GET, produces = "text/plain;charset=UTF-8")
    public String addDiscount(@RequestParam("mincost") String mincost,
                               @RequestParam("cityid") String cityid,
                               @RequestParam("periodstart") String periodstart,
                               @RequestParam("periodend") String periodend) {
        return DaoTarif.insertTarif(mincost, cityid, periodstart, periodend).toString();
    }

    @RequestMapping(value = "/editTarif", params = {"mincost", "cityid", "periodstart","periodend", "tarifid"}, method = RequestMethod.GET, produces = "text/plain;charset=UTF-8")
    public String updateTarif(@RequestParam("mincost") String mincost,
                                  @RequestParam("periodstart") String periodstart,
                                  @RequestParam("periodend") String periodend,
                                  @RequestParam("tarifid") String tarifid,
                                  @RequestParam("cityid") String cityid){
        return DaoTarif.updateTarif(mincost, periodstart, periodend, cityid, Integer.valueOf(tarifid)).toString();
    }

    @RequestMapping(value = "/deleteTarif", params = "tarifid", method = RequestMethod.GET, produces = "text/plain;charset=UTF-8")
    public String deleteTarif(@RequestParam("tarifid") String tarifid) {
        return DaoTarif.deleteTarif(Integer.valueOf(tarifid)).toString();
    }
}