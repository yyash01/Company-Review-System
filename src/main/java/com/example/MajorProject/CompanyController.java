package com.example.MajorProject;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "company")
public class CompanyController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping
    public List<Company> GetAllCompany(){
        String query = String.format("select * from COMPANY");
        List<Company>response = jdbcTemplate.query(query,new CompanyRowMapper());
        return response;
    }

    @GetMapping("/{CompanyId}")
    public Company GetCompany(@PathVariable int CompanyId){
        String query = String.format("select * from COMPANY where COMPANY_ID=%d;",CompanyId);
        Company obj = jdbcTemplate.queryForObject(query, new CompanyRowMapper());
        return obj;
    }

    @GetMapping("/GetReview/{CompanyId}")
    public List<SingleCompanyReview> GetReview(@PathVariable int CompanyId){
        String query = String.format("select C.*,U.USERNAME from COMPANY_REVIEW C INNER JOIN USER U ON C.AUTHOR=U.ID where C.COMPANYID=%d;",CompanyId);
        List<SingleCompanyReview> obj = jdbcTemplate.query(query, new CompanyReviewMapper());
        return obj;
    }

    @GetMapping("/Search/{Name}")
    public List<Company> GetCompanyByNameOrCategory(@PathVariable String Name){

        String query = String.format("select * from COMPANY where COMPANY_NAME like '%s%%' or CATEGORY like '%s%%'",Name,Name);
        List<Company> res = jdbcTemplate.query(query, new CompanyRowMapper());
        return res;
    }

    @PostMapping("/AddReview")
    public String AddReview(@RequestBody SingleCompanyReview obj){
        String findUser = String.format("select ID from USER where USERNAME='%s'", obj.getAuthor());
        Map<String,Object>res =  jdbcTemplate.queryForMap(findUser);

        String query = String.format("insert into COMPANY_REVIEW (AUTHOR,TITLE,CR_RATING,CREATION_DATE,COMPANYID,ANSWER_1,ANSWER_2,ANSWER_3,ANSWER_4) Values (%d,'%s',%d,'%s',%d,'%s','%s','%s','%s');",res.get("ID"),obj.getTitle(),obj.getRating(),obj.getDateTime(),obj.getCompanyId(),obj.getAnswerOne(),obj.getAnswerTwo(),obj.getAnswerThree(),obj.getAnswerFour());
        jdbcTemplate.execute(query);
        return "OK";
    }

    @GetMapping("/GetProduct/{CompanyId}")
    public List<Product> GetProduct(@PathVariable int CompanyId){
        String query = String.format("select * from PRODUCT where COMPANY_ID=%d",CompanyId);
        List<Product> obj = jdbcTemplate.query(query,new ProductRowMapper());
        return obj;
    }

    @GetMapping("/category")
    public List<Map<String,Object>> GetCategory(){
        String query = String.format("select DISTINCT(CATEGORY) from COMPANY;");
        List<Map<String,Object>> obj= jdbcTemplate.queryForList(query);
        return obj;
    }

    @DeleteMapping("/DeleteReview")
    public String DeleteReview(@RequestBody int obj){
       String query = String.format("DELETE from COMPANY_REVIEW where CRID=%d",obj);
       jdbcTemplate.execute(query);
       return "OK";
    }
}

