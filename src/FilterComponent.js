import React from "react";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";

class FilterInput extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.state = {
      name: this.props.name,
    //   value:"",
      placeholder: "",
      filterOptions: this.props.filterOptions,
      filterOpen: false,
    //   anchorEl: "",
    };
  }

  render() {
    // console.log(this.props,"props")
    return (
      <div>
        <FormControl>
          <Input
            id={this.state.name}
            type="text"
            value={this.props.value}
            onChange={this.props.onChange}
            placeholder={`${this.state.placeholder}`}
            startAdornment={
              <IconButton
                aria-label="Select Filter"
                onClick={this.props.handleFilterClick}>
                    <FilterListIcon fontSize="small" />
              </IconButton>
            }
          />
        </FormControl>
        <Menu
          id={`${this.state.name}-menu`}
          anchorEl={this.props.anchorEl}
          open={(this.props.anchorEl)}
          onClose={this.props.handleClose}
          getContentAnchorEl={null}
          anchorOrigin={{vertical: 'center', horizontal: 'left'}}
          transformOrigin={{vertical: 'center', horizontal: 'left'}}
          style={{left: 90}}
          keepMounted
        >
          {this.state.filterOptions.map(option => (
            <MenuItem onClick={this.props.handleClose}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default FilterInput;