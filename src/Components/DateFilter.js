import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GoArrowRight } from "react-icons/go";

function DateFilter({ startDate, endDate, handleDateChange }) {
    return (
        <>
            <div className="date-filter d-flex align-items-center" style={{"backgroundColor":"#FFFFFF", "width":"25%"}}>
                <div className="date-picker-container">
                    <DatePicker
                        selected={startDate}
                        placeholderText="Start Date"
                        dateFormat="dd/MM/yyyy"
                        onChange={(date) => handleDateChange(date, "start")}
                    />
                </div>
                <GoArrowRight style={{"position":"relative", "fontSize":"15px", "color":"#565a5c"}} />
                <div className="date-picker-container">
                    <DatePicker
                        selected={endDate}
                        placeholderText="End Date"
                        dateFormat="dd/MM/yyyy"
                        onChange={(date) => handleDateChange(date, "end")}
                    />
                </div>
            </div>
        </>
    );
}

export default DateFilter;
