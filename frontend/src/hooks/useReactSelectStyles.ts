import { useMemo } from "react";
import { GroupBase, StylesConfig } from "react-select";

export function useReactSelectStyles<
  T = unknown,
  U extends boolean = boolean
>() {
  const styles: StylesConfig<T, U, GroupBase<T>> = useMemo(
    () => ({
      input: (styles) => ({
        ...styles,

        outlineColor: "var(--primary)",
        borderColor: "var(--primary)!important",
      }),
      placeholder: (styles) => ({
        ...styles,
        fontWeight: "bold",
        borderColor: "var(--primary)!important",
      }),
      menuList: (styles) => ({
        ...styles,

        border: "1px solid var(--primary)",
      }),
      option: (styles) => ({
        ...styles,
        color: "var(--dark)",

        backgroundColor: "var(--light50)",

        "&:hover": {
          color: "var(--light)",
          cursor: "pointer",

          backgroundColor: "var(--primary)",
        },
      }),
      noOptionsMessage: (styles) => ({ ...styles, color: "var(--primary)" }),

      control: (styles, state) => ({
        ...styles,

        borderColor: state.isFocused ? "var(--primary)" : "var(--light50)",
        borderWidth: "medium",
        outlineColor: "var(--primary)",
      }),
      multiValue: (styles) => ({
        ...styles,
        backgroundColor: "var(--secondary)",
        color: "var(--light50)",
        borderRadius: "1em",
      }),
      multiValueLabel: (styles) => ({
        ...styles,

        color: "var(--light50)",
      }),
      menu: (styles) => ({
        ...styles,
        zIndex: 1400,
      }),
    }),
    []
  );

  return styles;
}
