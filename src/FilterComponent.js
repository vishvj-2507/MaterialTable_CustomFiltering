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
      filterOptions: this.props.filterOptions,
      filterOpen: false,
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
            placeholder="Id"          
            startAdornment={
              <IconButton style={{padding:3}}
                aria-label="Select Filter"
                onClick={this.props.handleFilterClick}>
                    <FilterListIcon fontSize="medium" style={{color: "#000"}}/>
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