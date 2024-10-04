package com.example.MajorProject;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "admin")
public class AdminController {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    

    @PostMapping
    public String CheckAdmin(@RequestBody User admin){
        String Query = String.format("select * from USER where ID=%d and USERNAME='%s';", admin.getId(), admin.getUserName());
        List<User> user = jdbcTemplate.query(Query, new UserRowMapper());
        
        if(user.size()==0){
            return "Please Add Correct Username";
        }

        String QueryFinal = String.format("select * from USER where ID=%d and USERNAME='%s' and PASSWORD='%s';", admin.getId(), admin.getUserName(),admin.getPassword());
        user = jdbcTemplate.query(QueryFinal, new UserRowMapper());

        if(user.size()==0){
            return "Please Add Correct Password";
        }

        return "OK";
    }

    @PostMapping("/AddCompany")
    public Company AddCompany(@RequestBody Company obj){
       String Query = String.format("INSERT INTO COMPANY(COMPANY_NAME,CATEGORY,OVERVIEW,FEATURES,COMPANY_WEBSITE,RATING) VALUES ('%s','%s','%s','%s','%s',%d)",obj.getCompany_name(),obj.getCATEGORY(),obj.getOVERVIEW(),obj.getFEATURES(),obj.getCOMPANY_WEBSITE(),obj.getRATING());
        jdbcTemplate.execute(Query);
        return obj;
        //check the null of obj.
    }

    
    @PostMapping("/AddProduct")
    public Product AddProduct(@RequestBody Product obj){
        String findQuery = String.format("select * from COMPANY where COMPANY_NAME='%s';", obj.getCompanyName());
        Company c = jdbcTemplate.queryForObject(findQuery, new CompanyRowMapper());

        String Query = String.format("INSERT INTO PRODUCT(PRODUCT_NAME,CATEGORY,COMPANY_ID,PRICE,FEATURES,RATING) VALUES ('%s','%s',%d,%f,'%s',%d)",obj.getProductName(),obj.getCategory(),c.getCompanyId(),obj.getPrice(),obj.getFeatures(),obj.getRating());
        jdbcTemplate.execute(Query);
        return obj;
    }
}

