package com.example.MajorProject;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class CompanyRowMapper implements RowMapper<Company> {
    @Override
    public Company mapRow(ResultSet rs, int rowNum) throws SQLException{
        Company c = new Company();

        int CompanyId = rs.getInt("COMPANY_ID"); c.setCompanyId(CompanyId);
        String CompanyName = rs.getString("COMPANY_NAME");c.setCompany_name(CompanyName);
        String Category = rs.getString("CATEGORY"); c.setCATEGORY(Category);
        String CompanyOverview = rs.getString("OVERVIEW"); c.setOVERVIEW(CompanyOverview);
        String CompanyFeatures = rs.getString("FEATURES"); c.setFEATURES(CompanyFeatures);
        c.setCOMPANY_WEBSITE(rs.getString("COMPANY_WEBSITE"));
        int CompanyRating = rs.getInt("RATING");c.setRATING(CompanyRating);
        return c;
    }
}