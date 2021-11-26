import React from "react";
import { Controller } from "react-hook-form";
import petitions from "../Petitions/Petitions";
import { useEffect, useState } from "react";
import { TextField, Autocomplete, Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export default function CategorySelect({
  onChangeProp,
  control,
  defaultValue,
}) {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    petitions.GetCategories().then((y) => {
      setCategories(y.map((x) => x.name));
    });
  }, []);

  return (
    <Controller
      render={({ onChange, ...props }) => (
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={categories}
          disableCloseOnSelect
          getOptionLabel={(option) => option}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </li>
          )}
          style={{ width: 500 }}
          renderInput={(params) => <TextField {...params} label="Categorias" />}
          onChange={onChangeProp}
          {...props}
        />
      )}
      onChange={([, data]) => data}
      defaultValue={defaultValue}
      name="categories"
      control={control}
    />
  );
}
