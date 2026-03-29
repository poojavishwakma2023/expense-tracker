import React from "react";
import type { CSSProperties } from "react";

type InputProps = {
    label?: string
    name: string
    type?: string
    value: string | number
    placeholder?: string
    required?: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    className?: string
    customInputStyle?: CSSProperties
    customLabelStyle?: CSSProperties

}

const CustomInput = ({
    label,
    name,
    type = "text",
    value,
    placeholder,
    required,
    onChange,
    className = "",
    customInputStyle,
    customLabelStyle,
}: InputProps) => {



    return (
        <div style={{ marginTop: "10px", marginBottom: '20px' }}>

            {label && <label style={{ ...styles.defaultLabelStyle, ...customLabelStyle }}>{label}
                {required && <span style={{ color: "red", marginLeft: "4px" }}>*</span>}
            </label>}

            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={className}
                style={{ ...styles.defaultInputStyle, ...customInputStyle }}
            />

        </div>
    )
}

export default CustomInput;

const styles: Record<string, CSSProperties> = {
    defaultInputStyle: {
        width: "100%",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        outline: "none",
        fontSize:"12px"

    },
    defaultLabelStyle: {
        display: "block",
        marginBottom: "6px",
        fontSize: "14px",
        fontWeight: "500",
        color: "#1c3864"
    }

}