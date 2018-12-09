package com.mkyong.web.controller;

import com.google.gson.Gson;
import com.mkyong.web.dao.DaoUser;
import com.mkyong.web.models.Users;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;

@RestController
public class AuthController {

	@RequestMapping(value = "/user", method = RequestMethod.GET)
	public String currentUser(HttpServletRequest request) {
		Principal authentication = request.getUserPrincipal();
		if (authentication != null) {
			String login = authentication.getName();
			Users user = DaoUser.getUserFromDao(login);
			return user != null ? new Gson().toJson(user) : null;
		}
		return null;
	}

}