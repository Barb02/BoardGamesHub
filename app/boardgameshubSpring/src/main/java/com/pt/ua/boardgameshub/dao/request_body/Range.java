package com.pt.ua.boardgameshub.dao.request_body;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Range {
    private double min;
    private double max;

    public static Range parseString(String rangeString) {

        if(rangeString.isEmpty()){
            return new Range(-1,-1);
        }

        String[] parts = rangeString.split("_");

        if (parts.length != 2) {
            throw new IllegalArgumentException("Invalid range format. Expected format: min_max");
        }
        
        if(parts[0].equalsIgnoreCase("any") && parts[1].equalsIgnoreCase("any"))
            return new Range(Double.MAX_VALUE, Double.MIN_VALUE);

        if(parts[0].equalsIgnoreCase("any"))
            return new Range(1, Double.parseDouble(parts[1]));

        if(parts[1].equalsIgnoreCase("any"))
            return new Range(Double.parseDouble(parts[0]), Double.parseDouble(parts[0]));

        return new Range(Double.parseDouble(parts[0]), Double.parseDouble(parts[1]));
    }
}